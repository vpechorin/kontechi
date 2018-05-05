const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelRestSpreadPlugin = require('babel-plugin-transform-object-rest-spread');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    './main.js',
    './styles/index.scss'
  ],
  stats: 'verbose',
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static',
      copyUnmodified: true,
    }])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                useBuiltIns: false,
                targets: {
                  browsers: ['last 2 versions', 'safari >= 9', 'ie 11']
                }
              }],
              'react',
              'stage-0'
            ],
            plugins: [BabelRestSpreadPlugin]
          }
        }
      },
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};

