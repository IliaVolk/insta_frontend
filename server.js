const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.develop.config.js');
const port = 6500;
const app = express();
var isProduction = process.env.NODE_ENV === "production"


var indexHtmlFileName;
if (isProduction){
  indexHtmlFileName = "/index.html"
}else {
  indexHtmlFileName = "/indexLocal.html"
}


const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});;
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  res.write(fs.readFileSync(path.join(__dirname, indexHtmlFileName)));
  res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open uphttp://team.binary-studio.com/projects in your browser.', port, port);
});
