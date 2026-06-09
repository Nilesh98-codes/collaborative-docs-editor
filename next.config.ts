import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // pdfjs-dist references 'canvas' for Node.js — not needed in browser
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
