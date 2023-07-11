/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/voicequize.vercel.app\/.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'static-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
  reactStrinctMode: true,
});

module.exports = nextConfig;
