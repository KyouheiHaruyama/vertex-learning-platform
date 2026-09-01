import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity serves every image asset from its own CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
