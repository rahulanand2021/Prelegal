/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
};

// Rewrites only apply during `next dev` — static export build ignores them but would error if present
if (process.env.NODE_ENV !== 'production') {
  nextConfig.rewrites = async () => [
    { source: '/api/:path*', destination: 'http://localhost:8000/api/:path*' },
  ];
}

module.exports = nextConfig;
