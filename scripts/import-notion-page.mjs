#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const NOTION_VERSION = '2022-06-28';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function usage() {
  console.error(
    'Usage: node scripts/import-notion-page.mjs --token <NOTION_TOKEN> --page-url <url|id> [--out-dir imports/notion]'
  );
}

function normalizePageId(value) {
  if (!value) return null;
  const raw = value.replace(/[^a-fA-F0-9]/g, '');
  if (raw.length !== 32) return null;
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
}

function extractPageId(input) {
  if (!input) return null;
  const direct = normalizePageId(input);
  if (direct) return direct;

  const noQuery = input.split('?')[0];
  const tail = noQuery.split('/').pop() || '';
  const tailMatch = tail.match(/([a-fA-F0-9]{32})$/);
  if (tailMatch) return normalizePageId(tailMatch[1]);

  const fullMatch = input.match(/([a-fA-F0-9]{32})/);
  if (fullMatch) return normalizePageId(fullMatch[1]);
  return null;
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'untitled';
}

function safeText(input) {
  return input.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function richTextToMarkdown(rich = []) {
  return rich
    .map((part) => {
      const text = part.plain_text || '';
      if (!text) return '';

      let out = text;
      const a = part.annotations || {};
      if (a.code) out = `\`${out}\``;
      if (a.bold) out = `**${out}**`;
      if (a.italic) out = `*${out}*`;
      if (a.strikethrough) out = `~~${out}~~`;

      const href = part.href || part.text?.link?.url;
      if (href) out = `[${out}](${href})`;
      return out;
    })
    .join('');
}

function pageTitleFromProperties(properties) {
  for (const value of Object.values(properties || {})) {
    if (value?.type === 'title') {
      const t = richTextToMarkdown(value.title || []);
      if (t) return t;
    }
  }
  return 'Untitled';
}

async function notionGet(token, endpoint, params = {}) {
  const qs = new URLSearchParams(params);
  const url = `https://api.notion.com/v1${endpoint}${qs.toString() ? `?${qs}` : ''}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = `${data.code || 'error'}: ${data.message || 'unknown error'}`;
    throw new Error(`Notion API ${res.status} at ${endpoint} -> ${msg}`);
  }
  return data;
}

async function fetchAllChildren(token, blockId) {
  const out = [];
  let cursor;
  while (true) {
    const payload = await notionGet(token, `/blocks/${blockId}/children`, {
      page_size: '100',
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    out.push(...(payload.results || []));
    if (!payload.has_more || !payload.next_cursor) break;
    cursor = payload.next_cursor;
  }
  return out;
}

function renderBlockPrefix(type, level, content) {
  const indent = '  '.repeat(level);
  if (!content) return null;

  switch (type) {
    case 'heading_1':
      return `${'#'.repeat(Math.min(6, 1 + level))} ${content}`;
    case 'heading_2':
      return `${'#'.repeat(Math.min(6, 2 + level))} ${content}`;
    case 'heading_3':
      return `${'#'.repeat(Math.min(6, 3 + level))} ${content}`;
    case 'bulleted_list_item':
      return `${indent}- ${content}`;
    case 'numbered_list_item':
      return `${indent}1. ${content}`;
    case 'to_do':
      return `${indent}- [ ] ${content}`;
    case 'quote':
      return `${indent}> ${content}`;
    default:
      return `${indent}${content}`;
  }
}

async function renderBlocks(token, blocks, level, ctx) {
  const lines = [];
  for (const block of blocks) {
    const type = block.type;

    if (type === 'divider') {
      lines.push('---', '');
      continue;
    }

    if (type === 'child_page') {
      const title = block.child_page?.title || 'Untitled';
      lines.push(`${'#'.repeat(Math.min(6, 2 + level))} ${title}`, '');

      const childBlocks = await fetchAllChildren(token, block.id);
      const nested = await renderBlocks(token, childBlocks, level + 1, ctx);
      lines.push(...nested, '');
      continue;
    }

    const data = block[type] || {};
    const rich = data.rich_text || data.title || data.caption || [];
    let text = safeText(richTextToMarkdown(rich));

    if (type === 'code') {
      const lang = data.language || 'text';
      lines.push('```' + lang, text, '```', '');
      continue;
    }

    if (['image', 'video', 'audio', 'file', 'pdf', 'bookmark', 'embed', 'link_preview'].includes(type)) {
      const url = data?.external?.url || data?.file?.url || richTextToMarkdown(rich) || '';
      if (url) lines.push(`[${type}](${url})`, '');
      continue;
    }

    if (type === 'equation') {
      text = data.expression || text;
      if (text) lines.push(`$${text}$`, '');
      continue;
    }

    if (type === 'callout') {
      const emoji = data.icon?.emoji ? `${data.icon.emoji} ` : '';
      if (text) lines.push(`> ${emoji}${text}`, '');
    } else {
      const line = renderBlockPrefix(type, level, text);
      if (line) lines.push(line, '');
    }

    if (block.has_children && type !== 'child_page') {
      const childBlocks = await fetchAllChildren(token, block.id);
      const nested = await renderBlocks(token, childBlocks, level + 1, ctx);
      lines.push(...nested);
    }
  }
  return lines;
}

async function main() {
  const args = parseArgs(process.argv);
  const token = args.token || process.env.NOTION_TOKEN;
  const pageInput = args['page-url'] || args['page-id'];
  const outDir = args['out-dir'] || 'imports/notion';

  if (!token || !pageInput) {
    usage();
    process.exit(1);
  }

  const pageId = extractPageId(pageInput);
  if (!pageId) {
    throw new Error(`Could not parse page id from: ${pageInput}`);
  }

  const page = await notionGet(token, `/pages/${pageId}`);
  const title = pageTitleFromProperties(page.properties);
  const slug = slugify(title);

  const blocks = await fetchAllChildren(token, pageId);
  const contentLines = await renderBlocks(token, blocks, 0, {});

  const finalLines = [`# ${title}`, '', ...contentLines];
  const markdown = finalLines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';

  fs.mkdirSync(outDir, { recursive: true });
  const outputPath = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(outputPath, markdown, 'utf8');

  const meta = {
    imported_at: new Date().toISOString(),
    page_id: pageId,
    title,
    output: outputPath,
    block_count: blocks.length,
  };

  const metaPath = path.join(outDir, `${slug}.meta.json`);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');

  console.log(`Imported: ${title}`);
  console.log(`Markdown: ${outputPath}`);
  console.log(`Metadata: ${metaPath}`);
  console.log(`Top-level blocks: ${blocks.length}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
