/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['staticflickr.com', 'bing.com', 'live.staticflickr.com', 'th.bing.com'],
  },
  env: {
    googleApiKey: 'my-value',
  },
}

module.exports = nextConfig
