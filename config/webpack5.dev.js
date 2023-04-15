require('dotenv').config();

module.exports = {
  mode: 'development',
  cache: true,
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    host: 'localhost',
    port: 5500,
  }
};
