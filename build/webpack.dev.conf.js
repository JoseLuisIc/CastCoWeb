const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin')

// Agregar código relacionado con la recarga en caliente a los fragmentos de entrada
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // "source-map" es más lento, pero útil para depuración
  devtool: '#source-map',

  recordsPath: path.resolve(__dirname, 'webpack-records.json'),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // Habilitar Hot Module Replacement (HMR)
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebpackPlugin sigue siendo necesario para la inyección de HTML
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true, // Habilitar Hot Module Replacement
    open: true, // Abrir el navegador automáticamente
    port: 8080, // Puerto del servidor
    historyApiFallback: true, // Soporte para aplicaciones SPA con rutas en la API de historial
    overlay: true, // Mostrar errores en la interfaz gráfica
    quiet: true, // Mantener la consola limpia en producción
    stats: 'minimal' // Minimizar el log de salida
  }
})