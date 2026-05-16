const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {sourceExts, assetExts} = defaultConfig.resolver;

const config = {
  resolver: {
    // Tambahkan 'mjs' ke dalam sourceExts
    sourceExts: [...sourceExts, 'mjs'],
  },
};

module.exports = mergeConfig(defaultConfig, config);