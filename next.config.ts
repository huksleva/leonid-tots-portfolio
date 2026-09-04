import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/leonid-tots-portfolio', // ← Жёстко указываем!
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
