import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first where the browser supports it; WebP otherwise.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
