import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const isReplit = process.env.REPL_ID !== undefined && process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(isReplit ? [] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: "/", // ✅ adiciona isso
  build: {
    outDir: "dist", // ✅ simplifica isso
    emptyOutDir: true,
  },
});
