var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: './src/main.js',
    colResizable: path.resolve(__dirname, './src/asset/plugin/colResizable.js'),
  },
  output: {
    path: path.resolve(__dirname, './built'),
    filename: 'js/[name].js?[chunkhash]',
    chunkFilename: 'js/[name].js?[chunkhash]',
    publicPath: '/built/'
  },
  resolve: {
    modules: [ 'node_modules' ]
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: "art-template-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      },
      {
        test: /\.png|jpg|gif|jpeg$/,
        loader: "url-loader?limit=8194&name=img/[name].[ext]",
        query: 'random=' + new Date().getTime(),
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.eot|svg|ttf|woff|woff2$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'), //production & development,
        'PAGE_SIZE': 10
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors','manifest']
    }),
    // remove all comments and desc and copyright
    new webpack.optimize.UglifyJsPlugin({output: {comments: false},compress: {warnings: false}}),

    new ExtractTextPlugin({ filename: "app.css?[chunkhash]", allChunks: true }),
    // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: '../index.html', //生成的html存放路径，相对于path
      template: './src/index.html', //html模板路径
      inject: true, //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['manifest', 'colResizable', 'vendors', 'main'],
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['manifest', 'colResizable', 'vendors', 'main'];
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ]
};