import demo1ToriaiHtml from '../../../demo1-toriai/index.html?raw';
import demo2MarukinHtml from '../../../demo2-marukin/index.html?raw';
import demo3ShokuHtml from '../../../demo3-shoku/index.html?raw';
import demo4SugitoHtml from '../../../demo4-sugito/index.html?raw';
import demo5KobikiHtml from '../../../demo5-kobiki/index.html?raw';
import norenHtml from '../../../noren/index.html?raw';

const pages: Record<string, string> = {
  noren: norenHtml,
  'demo1-toriai': demo1ToriaiHtml,
  'demo2-marukin': demo2MarukinHtml,
  'demo3-shoku': demo3ShokuHtml,
  'demo4-sugito': demo4SugitoHtml,
  'demo5-kobiki': demo5KobikiHtml,
};

const securityHeaders = {
  'Content-Security-Policy':
    "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ site: string }> },
) {
  const { site } = await params;
  const html = pages[site];

  if (!html) {
    return new Response('Not Found', {
      status: 404,
      headers: securityHeaders,
    });
  }

  return new Response(html, {
    headers: {
      ...securityHeaders,
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Language': 'ja',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
