/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['pix6.agoda.net','cdn6.agoda.net','pix8.agoda.net','q-xx.bstatic.com','thumbs.dreamstime.com'],
      },
};

module.exports = nextConfig;
