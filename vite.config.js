import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // 👈 Serve from root
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
  