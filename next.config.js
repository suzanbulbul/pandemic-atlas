/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    API_TOKEN: process.env.API_TOKEN,
  },
}

module.exports = nextConfig
