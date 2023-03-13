const path = require('path');
const webpack = require('webpack');

module.exports = {
  // ...other configuration options
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true // add this option
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ],
  },
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      three$: path.resolve(__dirname, 'node_modules/three/build/three.min.js'),
      'three/.*$': 'three/examples/jsm/$0',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three',
    }),
  ],
};
