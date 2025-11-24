/** @type {import('tailwindcss').Config} */
export default {
  // ESSENCIAL: A propriedade 'content' lista todos os arquivos que o Tailwind
  // deve escanear para saber quais classes CSS ele precisa gerar.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Garante que o Tailwind use a fonte 'Inter'
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}