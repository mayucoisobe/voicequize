/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});

// const nextConfig = {
//   reactStrictMode: true,
// };

// const withPWA = require('next-pwa');
// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//   },
//   reactStrictMode: true,
// });

// module.exports = nextConfig;
