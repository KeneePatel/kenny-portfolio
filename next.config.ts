import type { NextConfig } from "next";

import { imageWidths } from "./lib/image-loader";

const nextConfig: NextConfig = {
  // Hosted as static files on Cloudflare (see wrangler.jsonc): `next build`
  // writes the whole site to out/. Cache Components and Partial Prefetching
  // need a Node server, so they're off; every page here is static anyway.
  output: "export",
  images: {
    // No image server on a static host: photos are pre-resized WebP files.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: imageWidths,
    imageSizes: [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
