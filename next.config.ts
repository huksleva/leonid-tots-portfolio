import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/leonid-tots-portfolio', // ← БЕЗ условия isProd!
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
