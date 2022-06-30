import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "development", // 开发模式
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "less",
  //     patterns: [path.resolve(__dirname, "./src/assets/css/style.less")],
  //   },
  // },
});
