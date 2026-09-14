import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" route indicator is development-only, but it shows up in review screenshots.
  devIndicators: false,
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
