import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(projectRoot, 'public');
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
await mkdir(publicRoot, { recursive: true });

for (const entry of entries) {
  await cp(join(projectRoot, entry), join(publicRoot, entry), {
    recursive: true,
  });
}
