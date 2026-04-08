import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/qr/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared/src/types.ts"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3001",
      "/r": "http://localhost:3001",
    },
  },
});
