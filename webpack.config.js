const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src/test.js'),
  html: path.join(__dirname, 'src/index.html'),
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    PATHS.app,
    PATHS.html,
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
      },
    ],
  },
};