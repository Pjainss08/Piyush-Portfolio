#!/usr/bin/env node
// Walk public/ and convert every PNG / JPG / JPEG to WebP using cwebp.
// The source file is deleted after a successful conversion.
// Requires `cwebp` on PATH (brew install webp).

import { readdirSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'work');
const QUALITY = 92;
const EXTS = new Set(['.png', '.jpg', '.jpeg']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(entry).toLowerCase())) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
if (!files.length) {
  console.log('No PNG/JPG/JPEG files found in /public.');
  process.exit(0);
}

let ok = 0;
for (const src of files) {
  const dst = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (existsSync(dst)) {
    console.log(`skip   ${src.slice(ROOT.length + 1)} (webp exists)`);
    continue;
  }
  try {
    execFileSync('cwebp', ['-q', String(QUALITY), src, '-o', dst], { stdio: 'pipe' });
    unlinkSync(src);
    console.log(`webp   ${src.slice(ROOT.length + 1)} -> ${dst.slice(ROOT.length + 1)}`);
    ok++;
  } catch (e) {
    console.error(`fail   ${src.slice(ROOT.length + 1)}: ${e.message}`);
  }
}
console.log(`\nConverted ${ok}/${files.length} file(s).`);
