const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/**
 * Devuelve la ruta de los activos (CSS, JS, imágenes, etc.) según el entorno.
 */
exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

/**
 * Genera los loaders para los archivos CSS y sus variantes (less, sass, etc.).
 */
exports.cssLoaders = (options = {}) => {
  const { sourceMap, extract } = options;

  // Cargador básico para CSS
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap,
    },
  };

  // Generar el array de loaders para un tipo de archivo y su configuración
  const generateLoaders = (loader, loaderOptions = {}) => {
    const loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap,
        },
      });
    }

    return options.extract
      ? [MiniCssExtractPlugin.loader, ...loaders]  // Extraer CSS en producción
      : ['vue-style-loader', ...loaders];          // Cargar en el DOM para desarrollo
  };

  // Retorna los loaders configurados para cada tipo de archivo
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

/**
 * Genera los loaders para archivos de estilo fuera de archivos .vue
 */
exports.styleLoaders = (options) => {
  const loaders = exports.cssLoaders(options);
  return Object.keys(loaders).map((extension) => ({
    test: new RegExp(`\\.${extension}$`),
    use: loaders[extension],
  }));
};
