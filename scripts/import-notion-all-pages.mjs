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
    'Usage: node scripts/import-notion-all-pages.mjs --token <NOTION_TOKEN> [--out-dir imports/notion/all-pages]'
  );
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'untitled';
}

function safeText(input) {
  return (input || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
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

async function notionRequest(token, endpoint, method = 'GET', body = null, params = {}) {
  const qs = new URLSearchParams(params);
  const url = `https://api.notion.com/v1${endpoint}${qs.toString() ? `?${qs}` : ''}`;

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
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
    const payload = await notionRequest(token, `/blocks/${blockId}/children`, 'GET', null, {
      page_size: '100',
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    out.push(...(payload.results || []));
    if (!payload.has_more || !payload.next_cursor) break;
    cursor = payload.next_cursor;
  }
  return out;
}

async function listAllPages(token) {
  const pages = [];
  let cursor;

  while (true) {
    const body = {
      page_size: 100,
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
      },
      filter: {
        property: 'object',
        value: 'page',
      },
      ...(cursor ? { start_cursor: cursor } : {}),
    };

    const payload = await notionRequest(token, '/search', 'POST', body);
    pages.push(...(payload.results || []));

    if (!payload.has_more || !payload.next_cursor) break;
    cursor = payload.next_cursor;
  }

  return pages;
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

async function renderBlocks(token, blocks, level) {
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
      const nested = await renderBlocks(token, childBlocks, level + 1);
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
      const nested = await renderBlocks(token, childBlocks, level + 1);
      lines.push(...nested);
    }
  }

  return lines;
}

function uniqueOutputPath(baseDir, slug, pageId, used) {
  const shortId = pageId.replace(/-/g, '').slice(0, 8);
  const candidate = `${slug}-${shortId}`;
  const file = `${candidate}.md`;

  if (!used.has(file)) {
    used.add(file);
    return path.join(baseDir, file);
  }

  let n = 2;
  while (true) {
    const alt = `${candidate}-${n}.md`;
    if (!used.has(alt)) {
      used.add(alt);
      return path.join(baseDir, alt);
    }
    n += 1;
  }
}

async function importOnePage(token, page, outDir, usedNames) {
  const pageId = page.id;
  const title = pageTitleFromProperties(page.properties);
  const slug = slugify(title);

  const blocks = await fetchAllChildren(token, pageId);
  const bodyLines = await renderBlocks(token, blocks, 0);
  const markdown = [`# ${title}`, '', ...bodyLines].join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';

  const outputPath = uniqueOutputPath(outDir, slug, pageId, usedNames);
  fs.writeFileSync(outputPath, markdown, 'utf8');

  const meta = {
    imported_at: new Date().toISOString(),
    page_id: pageId,
    title,
    source_url: page.url,
    output: outputPath,
    block_count: blocks.length,
    last_edited_time: page.last_edited_time,
  };

  const metaPath = outputPath.replace(/\.md$/, '.meta.json');
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');

  return {
    page_id: pageId,
    title,
    output: outputPath,
    meta: metaPath,
    block_count: blocks.length,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const token = args.token || process.env.NOTION_TOKEN;
  const outDir = args['out-dir'] || 'imports/notion/all-pages';

  if (!token) {
    usage();
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const pages = await listAllPages(token);
  const usedNames = new Set();
  const imported = [];
  const failed = [];

  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    const title = pageTitleFromProperties(page.properties);

    try {
      const result = await importOnePage(token, page, outDir, usedNames);
      imported.push(result);
      console.log(`[${i + 1}/${pages.length}] Imported: ${title}`);
    } catch (err) {
      failed.push({
        page_id: page.id,
        title,
        error: err.message || String(err),
      });
      console.error(`[${i + 1}/${pages.length}] Failed: ${title} -> ${err.message || err}`);
    }
  }

  const summary = {
    imported_at: new Date().toISOString(),
    total_pages_discovered: pages.length,
    imported_count: imported.length,
    failed_count: failed.length,
    imported,
    failed,
  };

  const summaryPath = path.join(outDir, '_import-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');

  console.log(`Discovered pages: ${pages.length}`);
  console.log(`Imported pages: ${imported.length}`);
  console.log(`Failed pages: ${failed.length}`);
  console.log(`Summary: ${summaryPath}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
