/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 Cloudflare Workers + OpenNext 必須
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
