'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
    app: __dirname + '/source/app.entry.jsx',
    load: __dirname + '/source/load.entry.jsx'
  },
  output: {
    path: __dirname + '/static/build',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {}
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel', query: { presets: ['es2015', 'stage-0'] }}
    ]
  }
}