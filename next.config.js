/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.discordapp.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: { serverActions: true },
}

module.exports = nextConfig
