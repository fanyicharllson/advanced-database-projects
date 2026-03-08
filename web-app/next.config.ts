import type { NextConfig } from "next";

// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    imgOptTimeoutInSeconds: 30, // Increase from 7 to 30 seconds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For Unsplash
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // For Pexels
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
