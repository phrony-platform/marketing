import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/product/anomaly-check', destination: '/product/firewall', permanent: true },
      { source: '/product/guard', destination: '/product/firewall', permanent: true },
      { source: '/product/guard/:path*', destination: '/product/firewall/:path*', permanent: true },
      { source: '/docs/sdks/typescript/install', destination: '/docs/sdks/typescript#install', permanent: true },
      { source: '/docs/sdks/typescript/connect', destination: '/docs/sdks/typescript#connect', permanent: true },
      { source: '/docs/sdks/typescript/run', destination: '/docs/sdks/typescript#run', permanent: true },
      {
        source: '/docs/sdks/typescript/interactive-session',
        destination: '/docs/sdks/typescript#interactive-session',
        permanent: true,
      },
      { source: '/docs/sdks/typescript/worker', destination: '/docs/sdks/typescript#worker', permanent: true },
      {
        source: '/docs/sdks/typescript/runtime-client',
        destination: '/docs/sdks/typescript#runtime-client',
        permanent: true,
      },
      { source: '/docs/sdks/typescript/utilities', destination: '/docs/sdks/typescript#utilities', permanent: true },
      { source: '/docs/sdks/python/install', destination: '/docs/sdks/python#install', permanent: true },
      { source: '/docs/sdks/python/connect', destination: '/docs/sdks/python#connect', permanent: true },
      { source: '/docs/sdks/python/run', destination: '/docs/sdks/python#run', permanent: true },
      {
        source: '/docs/sdks/python/interactive-session',
        destination: '/docs/sdks/python#interactive-session',
        permanent: true,
      },
      { source: '/docs/sdks/python/worker', destination: '/docs/sdks/python#worker', permanent: true },
      {
        source: '/docs/sdks/python/runtime-client',
        destination: '/docs/sdks/python#runtime-client',
        permanent: true,
      },
      { source: '/docs/sdks/python/utilities', destination: '/docs/sdks/python#utilities', permanent: true },
    ];
  },
  /** Minimal production image when using Docker or `pnpm start` from standalone. */
  output: 'standalone',
};

export default nextConfig;
