const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './assets/js/src/index.js',
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  target: ['web', 'es5'],
};
