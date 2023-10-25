/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'rickandmortyapi.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
