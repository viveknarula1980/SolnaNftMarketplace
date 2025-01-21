/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // Enforces strict mode for React
  trailingSlash: true,    // Ensures URLs have a trailing slash, optional
  // basePath: '/your-base-path', // Uncomment if you're deploying to a subfolder
};

module.exports = nextConfig;
