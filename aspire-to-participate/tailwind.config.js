/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      xs: "376px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["NotoSans", "system-ui"],
      serif: ["NotoSerif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      itim: ["Itim"],
      twinkle: ["TwinkleStar"],
    },
    extend: {
      animation: {
        shake: "shake 5s cubic-bezier(0.45, 0.03, 0.52, 0.95) infinite",
        expand: "expand 1s ease forwards",
        "scale-up": "scale-up 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "slide-top": "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      keyframes: {
        shake: {
          "0%, 20%": {
            transform: "translateX(0)",
          },
          "2%, 6%, 10%, 14%": {
            transform: "translateX(-10px)",
          },
          "4%, 8%, 12%": {
            transform: "translateX(10px)",
          },
          "16%": {
            transform: "translateX(8px)",
          },
          "18%": {
            transform: "translateX(-8px)",
          },
        },
        expand: {
          from: {
            height: "0%",
          },
          to: {
            height: "100%",
          },
        },
        "scale-up": {
          "0%": {
            transform: "scaleY(0)",
            "transform-origin": "0% 100%",
          },
          "100%": {
            transform: "scaleY(1)",
            "transform-origin": "0% 100%",
          },
        },
        "slide-top": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
    },
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
      "white-gradient": "#ffffff33",
      "blue-gradient": "#0080ff33",
      "green-gradient": "#59b20033",
      "fire-gradient": "#ff550033",
      "rose-gradient": "#ff008033",
    },
  },
  plugins: [],
};
