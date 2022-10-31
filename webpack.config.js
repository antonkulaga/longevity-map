const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', "@babel/preset-react"],
          plugins: ['@babel/transform-runtime']
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader'
    },
   { test: /\.tsx?$/,
     loader: "ts-loader"
   },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    port: 8084,
    hot: true,
    allowedHosts: [
      'localhost',
      'agingkills.eu',
      'pic'
    ],
    host: (process.env.HOST || '0.0.0.0'),
    open: true,
    proxy: {
      '/api': 'http://' + (process.env.HOST || '0.0.0.0') + ':' + (process.env.PORT || '8080'),
      allowedHosts: [
        'localhost',
        'agingkills.eu',
        "pic"
      ],
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
