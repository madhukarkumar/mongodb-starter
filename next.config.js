/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.tobi.sh',
      'cloudflare-ipfs.com',
      'loremflickr.com',
      'i.pravatar.cc'  // Add this line
    ]
  },
};

module.exports = nextConfig;