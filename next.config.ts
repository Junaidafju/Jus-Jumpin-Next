// next.config.ts - More permissive version
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jusjumpin.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      // Add more domains as needed
    ],

    // Alternative: Disable image optimization for external images
    // unoptimized: true,
  },
};

export default nextConfig;