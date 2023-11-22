/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.discordapp.com"],
    formats: ["image/avif", "image/webp"],
  },
}

module.exports = nextConfig
