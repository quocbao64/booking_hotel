/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'www.pexels.com', 'goldbelly.imgix.net', "localhost"]
  }
}

module.exports = nextConfig
