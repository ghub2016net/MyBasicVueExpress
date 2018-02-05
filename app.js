var express = require('express');
var path = require('path');

var app = express();// 创建一个express实例
var history =require('connect-history-api-fallback');
app.use(history());
if(app.get('env') == 'development'){
  var webpack = require('webpack');
  var webpackConfig = require('./build/webpack.dev.conf');
  var compiler = webpack(webpackConfig);// 调用webpack并把配置传递过去
  // 使用 webpack-dev-middleware 中间件
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
      colors: true,
      chunks: false
    }});
  app.use(devMiddleware);
  app.use(require("webpack-hot-middleware")(compiler));
}

module.exports = app;
