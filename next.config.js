/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['staticflickr.com', 'bing.com', 'live.staticflickr.com', 'th.bing.com'],
  },
}

module.exports = nextConfig
