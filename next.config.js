/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/products/:slug*',
        destination: 'https://backends.donnachoice.com/api/products/:slug*'
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/profile',
      },
    ]
  }
}
