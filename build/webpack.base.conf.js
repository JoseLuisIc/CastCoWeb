const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ESLintPlugin = require('eslint-webpack-plugin') // Nueva dependencia

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      // Reemplazamos eslint-loader con eslint-webpack-plugin
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000 // Limita a 10KB para archivos inline
          }
        },
        generator: {
          filename: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000 // Limita a 10KB para archivos inline
          }
        },
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'vue'],
      emitWarning: true
    })
  ]
}
