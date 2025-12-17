/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🔹 これですべてのページがHTML/JS/CSSとして書き出されます
  trailingSlash: true, // 🔹 Cloudflareでのパス解決を安定させるために推奨
  images: {
    unoptimized: true, // 🔹 output: "export" の場合は画像の最適化をオフにする必要があります
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};
export default nextConfig;
