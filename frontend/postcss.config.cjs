/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    // Usamos o nome de pacote exato sugerido pelo erro.
    '@tailwindcss/postcss': {}, 
    // O autoprefixer é necessário para compatibilidade de navegadores.
    'autoprefixer': {},
  }
}