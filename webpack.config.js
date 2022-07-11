const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { mainModule } = require('process');

module.exports ={
    mode : 'production',//can be changed to development
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
      },
      output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js',
        clean : true,
        assetModuleFilename: '[name][ext]',
      },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'],
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Joe Khawand',
          filename: 'index.html',
          template: 'src/template.html',
        }),
        new CnameWebpackPlugin({
          domain: 'www.joe-khawand.tech',
        }),
        new MiniCssExtractPlugin({
          filename: 'main.css'
        }),
    ],
}