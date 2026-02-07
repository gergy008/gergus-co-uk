/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure compatibility with Next.js 15
  experimental: {
    // Enable any experimental features if needed
  },
  // Ensure proper handling of static assets
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'isthereadroptoday.com',
      },
    ],
  },
  // Ensure proper transpilation of packages
  transpilePackages: ['@heroui/react'],
}

module.exports = nextConfig
