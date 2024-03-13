const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
  return path.join(__dirname, src);
}

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
   mode: process.env.NODE_ENV,
  devtool: 'source-map',
  target: 'electron-main',	
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules
  },

};
