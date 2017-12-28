const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var modern =  {
    entry: './public/elements/ecosml-app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module : {
        rules: [
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                  attrs: false
              }
            }
          }
        ]
    }
};

var ie =  {
    entry: ['babel-polyfill','./public/elements/ecosml-app.js'],
    output: {
        filename: 'ie-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module : {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["es2015", "stage-0"]
            }
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
                attrs: false
            }
          }
        }
      ]
    }
};

module.exports = [modern, ie];