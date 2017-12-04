const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const path = require('path')

module.exports = {
  entry: {
    'app1': './app1/js/main.js',
    'app2': './app2/js/main.js'
  },
  output: {
    path: __dirname,
    filename: "build/[name]/[hash:8].js"
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader', options: {minimize:true, importLoaders: 1 } },
           'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'build/[name]/[contenthash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'app1',
      chunks: ['app1'],
      filename: 'build/app1/index.html',
      template: 'app1/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'app2',
      chunks: ['app2'],
      filename: 'build/app2/index.html'
    })
  ]
};