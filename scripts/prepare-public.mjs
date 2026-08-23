import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeDemo3Html } from './sanitize-demo3.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(projectRoot, 'public');
const staticPages = [
  'noren',
  'demo1-toriai',
  'demo2-marukin',
  'demo3-shoku',
  'demo4-sugito',
  'demo5-kobiki',
];
const entries = [
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

await sanitizeDemo3Html(join(projectRoot, 'demo3-shoku', 'index.html'));

await rm(publicRoot, { recursive: true, force: true });
await mkdir(publicRoot, { recursive: true });
await cp(join(projectRoot, '_headers'), join(publicRoot, '_headers'));

for (const entry of entries) {
  await cp(join(projectRoot, entry), join(publicRoot, entry), {
    recursive: true,
  });
}

await rm(join(publicRoot, 'index.html'));

for (const page of staticPages) {
  await rm(join(publicRoot, page, 'index.html'));
}
