import type { NextConfig } from 'next';

const staticPages = [
  'noren',
  'demo1-toriai',
  'demo2-marukin',
  'demo3-shoku',
  'demo4-sugito',
  'demo5-kobiki',
];

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: '/_published/assets/:path*',
        },
        ...staticPages.map((page) => ({
          source: `/${page}/:path*`,
          destination: `/_published/${page}/:path*`,
        })),
        {
          source: '/index.html',
          destination: '/_published/index.html',
        },
        {
          source: '/robots.txt',
          destination: '/_published/robots.txt',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/noren/index.html#works',
        permanent: false,
      },
      ...staticPages.map((page) => ({
        source: `/${page}`,
        destination: `/${page}/index.html`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
