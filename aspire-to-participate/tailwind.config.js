/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'lightpink':'#EBB2BF',
      'pink':'#BF6384',
      'gray':'#D9D9D9',
      'black':'#2B2B2B'
    },
  },
  plugins: [],
};
