import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeDemo3Html } from './sanitize-demo3.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(projectRoot, 'public');
const publishedRoot = join(publicRoot, '_published');
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

await rm(publicRoot, { recursive: true, force: true });
await mkdir(publishedRoot, { recursive: true });
await cp(join(projectRoot, '_headers'), join(publicRoot, '_headers'));

for (const entry of entries) {
  await cp(join(projectRoot, entry), join(publishedRoot, entry), {
    recursive: true,
  });
}

await sanitizeDemo3Html(join(publishedRoot, 'demo3-shoku', 'index.html'));
