/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://static.nike.com/**'), new URL('https://lh3.googleusercontent.com/**')],
  },
}

module.exports = nextConfig
