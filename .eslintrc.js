module.exports = {
  root: true,
  parser: 'vue-eslint-parser', // Usa el parser adecuado para Vue.js
  parserOptions: {
    ecmaVersion: 2021,           // Asegúrate de usar la versión de ECMAScript 2021
    sourceType: 'module',        // Asegúrate de usar módulos ES6
    requireConfigFile: false,    // Esto desactiva la necesidad de un archivo de configuración de Babel
    babelOptions: {
      presets: ['@babel/preset-env'], // Configura Babel para que utilice el preset de ES2021
    },
  },
  env: {
    browser: true,               // Si estás trabajando en un entorno de navegador
    node: true,                  // Si estás trabajando en un entorno de Node.js
    es2021: true,                // Asegúrate de tener soporte para ES2021
  },
  extends: [
    'standard',                  // Configuración de estilo estándar de JavaScript
    'eslint:recommended',        // Reglas recomendadas por ESLint
    'plugin:vue/essential',      // Reglas recomendadas para Vue.js 2.x
  ],
  plugins: [
    'vue',                       // Plugin para analizar los archivos .vue
    'html',                       // Plugin para archivos HTML si es necesario
  ],
  rules: {
    'quotes': 'off', // Cambia 'single' por 'double' si prefieres comillas dobles
    'dot-notation': 'off',  // Desactiva la regla globalmente
    'vue/require-v-for-key': 'off',
    'vue/no-unused-components': 'off',
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'off',
    'quote-props': ['off'],
    'import/first': 'off',        // Desactivar la regla de orden de imports
    'arrow-parens': 0,            // Permitir funciones flecha sin paréntesis
    'generator-star-spacing': 0,  // Permitir async-await sin reglas de espaciado
    'space-before-function-paren': 0, // Desactivar espacio antes de paréntesis en funciones
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // Permitir debugger solo en producción
  },
}