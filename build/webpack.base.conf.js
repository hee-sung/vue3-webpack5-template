'use strict';

const path = require('path');
const webpack = require('webpack');

const config = require('../config');
const utils = require('./utils');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)

const isProd = !['LOCAL', 'DEV'].includes(process.env.NODE_ENV);
const buildConfig = isProd ? config.build : config.dev;

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/main.js',
  // entry: {
  //   app: ['@babel/polyfill',
  //     'core-js/modules/es6.promise',
  //     'core-js/modules/es6.array.iterator',
  //     './src/index.tsx']
  // },
  output: {
    filename: '[name].[contenthash].js',
    path: config.build.assetsRoot,
    publicPath: buildConfig.assetsPublicPath,
    clean: true,
    chunkLoadingGlobal: 'chocolleto-react'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [
          path.join(__dirname, '..', 'src'),
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ],
        // exclude: /node_modules/,
        exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
        use: [
          { loader: 'babel-loader' }
        ],
      },
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /.s[ca]ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // sourceMap: !isProd
              sourceMap: true, // true: 상대경로 인식. false: these relative modules were not found error.
              sassOptions: {
                outputStyle: 'compressed',
                includePaths: [
                  resolve('src'),
                  // resolve('node_modules')
                ],
              },
              // additionalData: `
              //   @import "@/assets/scss/mixin.scss";
              //   @import "@/assets/scss/main.scss";
              // `
            }
          }]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: !isProd
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        type: 'asset/resource',
        options: {
          limit: 5000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        // loader: 'url-loader',
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  optimization: {
    chunkIds: 'named'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      APP_ENV: utils.getAppEnv(),
      BUILD_NUMBER: process.env.BUILD_NUMBER || ''
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: `[${process.env.NODE_ENV}] react-webpack5-template`,
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name][contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    })
  ]
};