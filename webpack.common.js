const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelRestSpreadPlugin = require('babel-plugin-transform-object-rest-spread');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    './main.js'
    // './styles/index.scss'
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
    // new ExtractTextPlugin({ // define where to save the file
    //   filename: 'styles/[name].bundle.css',
    //   allChunks: true,
    // }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static',
      copyUnmodified: true,
    }])
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "styles/[name].css",
    //   chunkFilename: "styles/[id].css"
    // })
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
                  browsers: ['last 2 versions', 'safari >= 8', 'android >= 4', 'ie 10', 'ie 11']
                }
              }],
              'react',
              'stage-0'
            ],
            plugins: [BabelRestSpreadPlugin]
          }
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader"
      //   ]
      // },
      // { // regular css files
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader?importLoaders=1',
      //   }),
      // },
      // { // sass / scss loader for webpack
      //   test: /\.(sass|scss)$/,
      //   use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      // },
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};

