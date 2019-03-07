const path = require('path')
const mainConfig = require('../config/default.json')

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/entry.js')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(.js$)|(\.vue$)/,
        loader: 'eslint-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: 'css-loader',
          scss: 'css-loader|sass-loader',
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=/images/[name].[ext]'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: mainConfig.baseUrl.replace('/', '') + '/assets/js/[name].js'
  },
  resolve: {
    alias: {
      'pages': path.resolve(__dirname, '../src/pages/'),
      'components': path.resolve(__dirname, '../src/components/'),
      'theme': path.resolve(__dirname, '../src/theme/'),
      'entityComponent': path.resolve(__dirname, '../src/components/entities/'),
      'services': path.resolve(__dirname, '../src/services'),
      'modules': path.resolve(__dirname, '../src/vuex'),
      'images': path.resolve(__dirname, '../images'),
      'entities': path.resolve(__dirname, '../src/entities/')
    }
  }
}

module.exports = config
