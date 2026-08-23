import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeDemo3Html } from './sanitize-demo3.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(projectRoot, 'public');
const entries = [
  '_headers',
  'index.html',
  'robots.txt',
  'assets',
  'noren',
  'demo1-toriai',
  'demo2-marukin',
  'demo3-shoku',
  'demo4-sugito',
  'demo5-kobiki',
];

await rm(publicRoot, { recursive: true, force: true });
await mkdir(publicRoot, { recursive: true });

for (const entry of entries) {
  await cp(join(projectRoot, entry), join(publicRoot, entry), {
    recursive: true,
  });
}

await sanitizeDemo3Html(join(publicRoot, 'demo3-shoku', 'index.html'));
