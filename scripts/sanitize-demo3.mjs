import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const previewNavigationBridge =
  /transitionTo:function\(e,t\)\{e&&\/\^\[a-z0-9_-\]\+\$\/\.test\(e\)\?window\.parent\.postMessage\(\{type:"navigate",name:"navigate",data:\{targetPageId:e,params:t\|\|\{\}\}\},"\*"\):console\.error\('[^']*'\.concat\(e,'[^']*'\)\)\},goBack:function\(\)\{window\.parent\.postMessage\(\{type:"goBack",name:"navigate"\},"\*"\)\},/g;

const previewStateBridge =
  /dp=function\(e\)\{"u">typeof window&&window\.parent&&window\.parent\.postMessage\(\{type:"update",name:"state",data:\{state:df\(e\),ts:Date\.now\(\)\}\},"\*"\)\},dm=function\(e\)\{"u">typeof window&&e\.subscribe\(function\(e\)\{try\{dp\(e\)\}catch\(e\)\{\}\}\)\},/g;

const sourceLocationMetadata =
  /\{fileName:"(?:\\.|[^"\\])*",lineNumber:\d+,columnNumber:\d+\}/g;

export async function sanitizeDemo3Html(filePath) {
  let html = await readFile(filePath, 'utf8');

  html = html
    .replace(previewNavigationBridge, 'transitionTo:function(){},goBack:function(){},')
    .replace(previewStateBridge, 'dp=function(){},dm=function(){},')
    .replaceAll(
      'new URLSearchParams(window.location.search)',
      'new URLSearchParams()',
    )
    .replace(sourceLocationMetadata, '{}')
    .replace(/\r?\n?\/\/# sourceMappingURL=[^<\r\n]+/g, '');

  const unsafeMarkers = [
    'window.parent.postMessage',
    'new URLSearchParams(window.location.search)',
    'C:\\\\Users\\\\imaidaiki\\\\AppData',
  ];

  const remainingMarker = unsafeMarkers.find((marker) => html.includes(marker));
  if (remainingMarker) {
    throw new Error(`demo3 sanitization failed: ${remainingMarker}`);
  }

  await writeFile(filePath, html, 'utf8');
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const target = process.argv[2];
  if (!target) throw new Error('Usage: node scripts/sanitize-demo3.mjs <html>');
  await sanitizeDemo3Html(resolve(target));
}
