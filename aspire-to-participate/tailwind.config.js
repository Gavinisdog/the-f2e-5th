/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
    colors: {
      "transparent": "transparent",
      "light-1": "#c1c1c1",
      "light-2": "#b9b9b9",
      "white": "#fff",
      "pink-1": "#BF6384",
      "pink-2": "#EBB2BF",
      "gray-1": "#D9D9D9",
      "gray-2": "#434343",
      "gray-3": "#2B2B2B",
      "black": "#000",
    },
  },
  plugins: [],
};
