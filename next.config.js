/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});
const nextConfig = {}

module.exports = withPWA({
  // Your Next.js config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plmqhcualnnsirfqjcsj.supabase.co',
      },
    ],
  }/* ,
  images: {
    domains: ['plmqhcualnnsirfqjcsj.supabase.co'],
  } */
});
