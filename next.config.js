/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  swcMinify: true,
}

module.exports = nextConfig
