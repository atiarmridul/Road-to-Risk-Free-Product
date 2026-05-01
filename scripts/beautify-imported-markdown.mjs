#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function collectMarkdownFiles(rootDir) {
  const out = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.md')) {
        out.push(full);
      }
    }
  }

  walk(rootDir);
  return out.sort();
}

function normalizeHeadingLine(line) {
  const m = line.match(/^(\s{0,3}#{1,6})\s+\*\*(.*?)\*\*\s*$/);
  if (!m) return line;
  const hashes = m[1];
  const content = m[2].replace(/\s+/g, ' ').trim();
  return `${hashes} ${content}`;
}

function cleanupContent(content) {
  let out = content;

  out = out.replace(/\u00A0/g, ' ');
  out = out.replace(/\r\n?/g, '\n');
  out = out.replace(/[ \t]+$/gm, '');

  // Normalize bullet glyphs from Notion exports.
  out = out.replace(/^(\s*)•\s+/gm, '$1- ');

  // Targeted known typo from import.
  out = out.replace(/^T\*\*o generate html report:\*\*/gm, '**To generate html report:**');

  const lines = out.split('\n').map((line) => normalizeHeadingLine(line));

  // Collapse repeated horizontal rules (including blank lines between them).
  const compact = [];
  let lastNonEmpty = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---' && lastNonEmpty === '---') continue;
    compact.push(line);
    if (trimmed !== '') lastNonEmpty = trimmed;
  }

  out = compact.join('\n');
  out = out.replace(/\n{3,}/g, '\n\n');

  return out.trimEnd() + '\n';
}

function main() {
  const root = process.argv[2] || 'imports/notion/all-pages';
  if (!fs.existsSync(root)) {
    console.error(`Directory not found: ${root}`);
    process.exit(1);
  }

  const files = collectMarkdownFiles(root);
  let changed = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = cleanupContent(before);
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf8');
      changed += 1;
      console.log(`updated: ${file}`);
    }
  }

  console.log(`files scanned: ${files.length}`);
  console.log(`files updated: ${changed}`);
}

main();
