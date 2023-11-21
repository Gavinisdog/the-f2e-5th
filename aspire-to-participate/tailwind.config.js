/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      itim: ["Itim"],
      twinkle: ["TwinkleStar"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      "light-1": "#c1c1c1",
      "light-2": "#b9b9b9",
      white: "#fff",
      "pink-1": "#BF6384",
      "pink-2": "#EBB2BF",
      "gray-1": "#D9D9D9",
      "gray-2": "#434343",
      "gray-3": "#2B2B2B",
      black: "#000",
      "blue-1": "#0080ff",
      "green-1": "#59b200", 
      "green-2": "#66cc00",
      "fire-1": "#ff5500", 
      "fire-2": "#cc0000",
      "rose-1": "#ff0080",
      "v-dark": "#323338",
      "v-dark-grey": "#676879", 
      "v-grey": "#c5c7d0", 
      "v-light-grey": "#f5f6f8", 
      "v-ui-grey": "#e6e9ef", 

    },
  },
  plugins: [],
};
