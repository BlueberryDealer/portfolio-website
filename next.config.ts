import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.icons8.com" },
      { hostname: "www.vectorlogo.zone" },
      { hostname: "cdn.jsdelivr.net" },
    ],
  },
};

export default nextConfig;
