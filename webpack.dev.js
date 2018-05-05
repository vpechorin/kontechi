const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
              minimize: false,
              localIdentName: '[local]', // "[name]__[local]___[hash:base64:5]",
              modules: true
            }
          },
          {
            loader: 'resolve-url-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              minimize: false,
              localIdentName: '[local]', // "[name]__[local]___[hash:base64:5]",
              modules: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles'],
              sourceMap: true // needed for resolve-url-loader
            }
          }
        ]
      }

    ]
  }
});

