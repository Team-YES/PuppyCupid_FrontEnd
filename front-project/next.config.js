/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd", "emoji-mart"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
