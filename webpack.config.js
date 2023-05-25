const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[contenthash].[ext]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash].[ext]'
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: '--- Scripts ---',
      template: 'src/index.html',
      favicon: 'src/static/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
};
