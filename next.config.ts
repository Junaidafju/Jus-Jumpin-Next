// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set to false or remove this line:
  reactCompiler: false,

  env: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.jusjumpin.com' },
      { protocol: 'https', hostname: 'www.shutterstock.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'static.vecteezy.com' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;