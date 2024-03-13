const webpack = require('webpack');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

function srcPaths(src) {
  return path.join(__dirname, src);
}


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  module: {
    rules,
  },
plugins: [
    ...plugins,
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      IS_DEV_BRANCH: "true",
      IS_OFFICIAL_RELEASE: "false",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/src/assets/images'),
          to: path.resolve(__dirname + '/.webpack/renderer/images')
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/src/assets/fonts'),
          to: path.resolve(__dirname + '/.webpack/renderer/fonts')
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/src/assets/audios'),
          to: path.resolve(__dirname + '/.webpack/renderer/audios')
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/src/assets/Station-IC_html'),
          to: path.resolve(__dirname + '/.webpack/renderer/Station-IC_html')
        }
      ]
    }),
    // We need to copy the icon for Windows maker. Rename it because
    // Windows registry uses DisplayIcon = app.ico for the uninstaller.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/build-resources/icon.ico'),
          to: path.resolve(__dirname + '/.webpack/renderer/images/app.ico')
        }
      ]
    }),
  ],
  
};
