const config = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/transform-runtime',
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-typescript',
  ],
};

module.exports = (api) => {
  api.cache.forever();

  return config;
};
