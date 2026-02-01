const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./src/config/data');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/templates/index.html',
        filename: 'index.html',
        minify: !isDevelopment,
        templateParameters: {
          config: config,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      })
    ],
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    },
    devtool: isDevelopment ? 'source-map' : false,
  };
}; 