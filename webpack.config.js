const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias['react'] = require.resolve("react");
  config.resolve.alias['react-dom'] = require.resolve("react-dom");
  return config;
};
