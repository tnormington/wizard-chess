const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     // disable: process.env.NODE_ENV === "development"
// });

module.exports = {
  watch: true,
  entry: './js/app.js',
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { 
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          // use: ['css-loader', 'sass-loader'],
            use: [
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  includePaths: ['sass/partials']
              },
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css",
    }),
  ]
};