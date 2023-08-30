import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src/index.tsx'),
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
        test: /\.tsx?$/i,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[folder]__[local]__[hash]',
                localIdentHashDigestLength: 5,
              },
            },
          },
          'sass-loader'
        ],
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
