const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: path.resolve(__dirname, 'src/index.js'),
      filename: '[name].js',
    },
  },
  output: {
    filename: '[name][contenthash].js',
    assetModuleFilename: '[name][ext]',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'URL выгруженного сайта',
  },
  devtool: 'eval',
  devServer: {  
    // overlay: true,
    // progress: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    server: 'https',
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: '--- Scripts ---',
      filename: '[name].html',
      template: 'src/index.html',
      favicon: 'src/static/favicon.ico',
    })
  ],
};
