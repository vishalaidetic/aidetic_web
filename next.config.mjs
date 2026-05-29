/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Required for Docker: bundles only what's needed to run the server
  output: 'standalone',
}

export default nextConfig
