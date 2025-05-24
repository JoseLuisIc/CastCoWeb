const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const ESLintPlugin = require('eslint-webpack-plugin'); // Nueva dependencia
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// Función para resolver rutas
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/main.js', // Punto de entrada de la aplicación
  },
  output: {
    path: config.build.assetsRoot, // Ruta de salida
    filename: '[name].js', // Nombre del archivo generado
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // Extensiones que Webpack resolverá automáticamente
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // Alias para Vue.js
      '@': resolve('src'), // Alias para src/
      'utils': resolve('src/utils'), // Alias para utils/
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // Para archivos .vue
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig, // Opciones del vue-loader
          },
        ],
      },
      {
        test: /\.js$/, // Para archivos .js
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Para compilar ES6+
            plugins: ['@babel/plugin-transform-runtime'], // Para evitar la duplicación de código
          },
        },
        include: [resolve('src'), resolve('test')], // Asegúrate de que la carpeta test esté incluida si la usas
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // Para imágenes
        type: 'asset', // Usa el nuevo manejo de assets de Webpack 5
        parser: {
          dataUrlCondition: {
            maxSize: 10000, // Limita a 10KB para archivos inline
          },
        },
        generator: {
          filename: utils.assetsPath('img/[name].[hash:7].[ext]'), // Path de las imágenes generadas
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // Para fuentes
        type: 'asset', // Usa el nuevo manejo de assets de Webpack 5
        parser: {
          dataUrlCondition: {
            maxSize: 10000, // Limita a 10KB para archivos inline
          },
        },
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:7].[ext]'), // Path de las fuentes generadas
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // Plugin de Vue Loader
    new ESLintPlugin({
      extensions: ['js', 'vue'], // Archivos a verificar
      emitWarning: true, // Emite advertencias en lugar de errores
    }),
     new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',  // Utiliza el hash para evitar problemas de cache
    }),
  ],
  optimization: {
    minimize: true, // Activar la minimización en producción
    minimizer: [
      new CssMinimizerPlugin(), // Plugin para minimizar el CSS
    ],
  },
};
