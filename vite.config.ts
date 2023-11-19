import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
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
  css: {
    preprocessorOptions: {
      // scss: {
      //   /**如果引入多个文件，可以使用
      //  * '@import "@/assets/scss/globalVariable1.scss";
      //  * @import"@/assets/scss/globalVariable2.scss";'
      // **/
      //   additionalData: '@import "@/main.scss";',
      // }
    },
  },
});
