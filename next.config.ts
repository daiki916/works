import type { NextConfig } from 'next';

const staticPages = [
  'noren',
  'demo1-toriai',
  'demo2-marukin',
  'demo3-shoku',
  'demo4-sugito',
  'demo5-kobiki',
];

const nextConfig: NextConfig = {
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
