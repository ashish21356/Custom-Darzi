const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.[hash].js',
    publicPath: '/'  // Ensure correct public path
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              // localsConvention: 'camelCase',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    //   favicon: 'favicon.ico'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};