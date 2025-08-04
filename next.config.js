const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
