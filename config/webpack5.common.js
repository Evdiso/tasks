const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const envConfig = { ...process.env, ...dotenv.config().parsed };
const rootDir = path.resolve(__dirname, '..');

const isEnvProduction = envConfig.NODE_ENV !== 'development';

console.log(`Running in ${isEnvProduction ? 'production' : 'development'} mode`);

module.exports = {
  entry: path.resolve(__dirname, './../src/main.ts'),
  output: {
    filename: isEnvProduction ? 'static/js/[name].[fullhash].js' : 'static/js/[name].js',
    path: isEnvProduction ? path.resolve(rootDir, 'build') : undefined,
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    assetModuleFilename: 'static/media/[name][ext]',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '..', './index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /(?<!module)\.css/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.module\.css/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg|webp)$/,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
