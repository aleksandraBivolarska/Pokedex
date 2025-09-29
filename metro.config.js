const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Let Metro understand `.cjs` files
config.resolver.sourceExts.push('cjs');

module.exports = config;
