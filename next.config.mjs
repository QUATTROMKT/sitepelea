/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Increase timeout for builds
    staticPageGenerationTimeout: 180,
  },
  // Increase memory limit for builds
  env: {
    NODE_OPTIONS: '--max-old-space-size=4096',
  },
}

export default nextConfig
