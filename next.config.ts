import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/product/anomaly-check', destination: '/product/firewall', permanent: true },
      { source: '/product/guard', destination: '/product/firewall', permanent: true },
      { source: '/product/guard/:path*', destination: '/product/firewall/:path*', permanent: true },
    ];
  },
  /** Minimal production image when using Docker or `pnpm start` from standalone. */
  output: 'standalone',
};

export default nextConfig;
