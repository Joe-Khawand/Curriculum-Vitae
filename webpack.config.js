const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');

module.exports ={
    mode : 'development',
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
    ],
}