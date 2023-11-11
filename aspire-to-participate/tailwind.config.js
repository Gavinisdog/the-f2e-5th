/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*", "./index.html"],
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {},
    extend: {},
  },
  plugins: [],
};
