/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
