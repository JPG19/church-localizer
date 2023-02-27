/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['church-localizer.s3.amazonaws.com'],
  },
  env: {
    googleApiKey: 'my-value',
  },
}

module.exports = nextConfig
