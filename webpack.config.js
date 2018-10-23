const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
 
module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new CopyWebpackPlugin([{ from: 'public', to: '.' }]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    })
  ]
};