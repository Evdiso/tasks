const { merge } = require('webpack-merge');
const commonConfig = require('./webpack5.common');
const devConfig = require('./webpack5.dev');
const prodConfig = require('./webpack5.prod');

module.exports = () => {
  return process.env?.NODE_ENV !== 'development'
    ? merge(commonConfig, prodConfig)
    : merge(commonConfig, devConfig);
};
