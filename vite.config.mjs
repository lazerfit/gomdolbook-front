import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", "js", ".jsx"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/?(*.)test.ts?(x)"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
    setupFiles: ["./src/test-utils/setupHttp"],
  },
  build: {
    outDir: "dist",
  },
});
