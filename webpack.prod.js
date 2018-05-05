const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const cssnano = require('cssnano');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
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
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]', // "[name]__[local]___[hash:base64:5]",
              minimize: true,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                cssnano({
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions', 'safari >= 8', 'android >= 4', 'ie 10', 'ie 11']
                  },
                  discardComments: {
                    removeAll: true
                  },
                  discardUnused: false,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourceMap: true
                })
              ],
              sourceMap: true
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
              importLoaders: 3,
              sourceMap: true,
              localIdentName: '[local]', // "[name]__[local]___[hash:base64:5]",
              minimize: true,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                cssnano({
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions', 'safari >= 8', 'android >= 4', 'ie 10', 'ie 11']
                  },
                  discardComments: {
                    removeAll: true
                  },
                  discardUnused: false,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourceMap: true
                })
              ],
              sourceMap: true
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

