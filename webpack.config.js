var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: APP_DIR + '/test.js',
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
    ],
  },
};
