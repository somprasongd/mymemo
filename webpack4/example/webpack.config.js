const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader', // not use postcss now
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      'dist'
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: !devMode
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    host: "0.0.0.0"
  }
};