'use strict';

var path = require('path');
var webpack = require('webpack');
var   mainJsFileName = "src/app/main.js"
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

var isProduction = process.env.NODE_ENV === "production"
if (isProduction){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
}else {
}
module.exports = {
  devtool: isProduction?"":'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, mainJsFileName)
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: plugins

    /*new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })*/
  ,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-1"
        , "react-hmre",// comment this string in production
        ],
        "plugins": ["transform-decorators-legacy"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.sass$/,
      loader: "style!css?&modules&localIdentName=[local]!postcss!sass?"
    }]
  }
};
