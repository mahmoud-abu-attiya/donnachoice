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
      {
        source: '/api/create_online_order',
        destination: 'https://backends.donnachoice.com/api/create_online_order'
      },
      {
        source: '/api/create_cash_order',
        destination: 'https://backends.donnachoice.com/api/create_cash_order'
      },
      {
        source: '/api/categories',
        destination: 'https://backends.donnachoice.com/api/categories'
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
