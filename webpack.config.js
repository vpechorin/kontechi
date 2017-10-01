const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// import config from './config';

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './main.js',
        './styles/index.scss'
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        port: 3000,
        proxy: {
          '/api': {
            target: 'http://localhost:8090'
          }
        },
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ // define where to save the file
            filename: 'styles/[name].bundle.css',
            allChunks: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            { // regular css files
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader?importLoaders=1',
                }),
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /static\/.*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'static',
                            outputPath: 'static'
                        }
                    }
                ]
            }
            ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};

