/** @type {import('next').NextConfig} */
const { withAxiom } = require("next-axiom");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = withAxiom(nextConfig);
