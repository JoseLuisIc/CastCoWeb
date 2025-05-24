const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');

// Agregar cliente de recarga en caliente (HMR) para todas las entradas
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  mode: 'development', // Modo de desarrollo

  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }), // Cargar los estilos con soporte para source maps
  },

  devtool: 'eval-source-map', // Tipo de source map para un desarrollo más rápido

  recordsPath: path.resolve(__dirname, 'webpack-records.json'), // Archivo de registros de Webpack

  plugins: [
    // Definir el entorno de desarrollo
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.dev.env),
    }),

    // Habilitar Hot Module Replacement (HMR)
    new webpack.HotModuleReplacementPlugin(),

    // Configurar el HtmlWebpackPlugin para la inyección automática de scripts
    new HtmlWebpackPlugin({
      filename: 'index.html', // Nombre del archivo de salida
      template: 'index.html', // Archivo base para el template
      inject: true, // Inyectar los scripts generados automáticamente
    }),

    // Plugin para mostrar errores y advertencias de manera amigable
    new FriendlyErrorsPlugin(),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'), // Directorio donde se sirven los archivos estáticos
    },
    hot: true, // Habilitar HMR
    open: true, // Abrir el navegador automáticamente
    port: 8080, // Puerto para el servidor de desarrollo
    historyApiFallback: true, // Permitir rutas de una sola página (SPAs)
    client: {
      overlay: {
        warnings: false, // No mostrar advertencias en la superposición del navegador
        errors: true, // Mostrar errores en la superposición
      },
      logging: 'none', // Evitar logs innecesarios en la consola
    },
  },
});
