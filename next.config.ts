import type { NextConfig } from "next";




// next.config.ts (ESM)
const nextConfig = {
  eslint: {
    // ⚠️ Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

