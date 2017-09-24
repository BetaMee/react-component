import express from 'express';
import path from 'path';
import webpack from 'webpack';

import RenderDevPage from './view/view';


const app = express();


app.use(express.static(path.resolve(__dirname, '../build')));

app.enable('trust proxy');

// 热加载热替换在开发环境下的配置
if (process.env.NODE_ENV === 'development') { // 开发模式下
  const webpackconfig = require('../webpack.config.dev.js');
  const compiler = webpack(webpackconfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackconfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}


app.get('*', (req, res, next) => {
  const html = RenderDevPage(process.env.NODE_ENV);
  res.status(200).end(html);
});

app.use((req, res, next) => {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use((err, req, res, next) => {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.send(err);
});

const PORT = 3000;

app.listen(PORT, (err) => {
  console.log('Node app is running on port:', PORT);
});
