const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8090'
      },
      '/att': {
        target: 'http://kontapp.home.pechorina.net',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

