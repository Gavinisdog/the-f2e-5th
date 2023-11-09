import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      // zip the html file
      minify: true,
    }),
  ],
  resolve: {
    alias: {
      // use @ instead of ./src
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
