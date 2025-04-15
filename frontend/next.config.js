import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure webpack to handle the @/ alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  
  // Optional: Configure images if you're using next/image
  images: {
    domains: [], // Add external image domains here if needed
  },
  
  // API rewrites configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
  
  // Optional: Enable experimental features if needed
  experimental: {
    // appDir: true,  // Uncomment if using Next.js 13+ app directory
    // serverActions: true,  // For Next.js 13.4+ server actions
  }
};

export default nextConfig;