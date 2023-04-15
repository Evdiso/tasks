const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[fullhash].css',
      chunkFilename: 'static/css/[name].[fullhash].chunk.css',
    }),
  ],
};
