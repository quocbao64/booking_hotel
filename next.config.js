/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["st3.depositphotos.com", 'res.cloudinary.com', 'www.pexels.com', 'goldbelly.imgix.net', "localhost"]
  }
}

module.exports = nextConfig
