module.exports = [

{
      test: /\.node$/,
      use: {
        loader: 'node-loader'
      }
    },
  {
    test: /\.(m?js|node)$/,
    exclude: /(.webpack|node_modules)/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  },
{
    test: /\.(svg|ico|icns)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
  {
    test: /\.(jpg|png|woff|woff2|eot|ttf|htm)$/,
    loader: "url-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
