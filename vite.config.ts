import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], //@rendered in the browser path alias
  resolve: {
    alias: {
      "@renderer": resolve("src/renderer/src"),
      "@types": "./types",
      "@components": resolve("src/components"),
      "@src": resolve("src"),
    },
  },
  server: {
    proxy: {
      "/programs": "http://localhost:3050/programs",
      "/students": "http://localhost:3050/students",
      "/courses": "http://localhost:3050/courses",
    },
  },
});
