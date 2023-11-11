/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*", 
    "./index.html"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
