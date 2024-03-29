const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { mainModule } = require('process');

module.exports ={
    mode : 'development',//options : development production
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        scroll: path.resolve(__dirname, 'src/scroll.js'),
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
            loader:'file-loader',
            options:{
              name:'[name].[ext]'
            }
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
          favicon: 'src/assets/img/favicon.ico',
        }),
        new CnameWebpackPlugin({
          domain: 'www.joe-khawand.tech',
        }),
        new MiniCssExtractPlugin({
          filename: 'main.css'
        }),
        new WebpackShellPluginNext({
          onBuildStart:{
            scripts: ['echo "===> Starting packing with WEBPACK 5" && echo ""'],
            blocking: true,
            parallel: false
          },
          onAfterDone:{
            scripts: ['source copy.sh'],
            blocking: true,
            parallel: false
          }
        }),
    ],
}