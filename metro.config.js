
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Configure for web support
config.resolver.platforms = ['web', 'ios', 'android', 'native'];

module.exports = withNativeWind(config, { input: './global.css' });
