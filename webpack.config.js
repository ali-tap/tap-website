var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
      },
      {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
             {
               loader: 'file-loader',
               options: {}
             }
           ]
       },
       {
         test: /\.(ttf|otf|eot|woff|woff2)$/,
         use: {
           loader: "file-loader",
           options: {
             name: "fonts/[name].[ext]",
           },
         },
       }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
      },
      {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
             {
               loader: 'file-loader',
               options: {}
             }
           ]
       },
       {
         test: /\.(ttf|otf|eot|woff|woff2)$/,
         use: {
           loader: "file-loader",
           options: {
             name: "fonts/[name].[ext]",
           },
         },
       }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]
