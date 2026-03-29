import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "../static/react",
    emptyOutDir: true,
		cssCodeSplit: false, // 🔥 important
    rollupOptions: {
      input: "./islands.tsx",
      output: {
        entryFileNames: "islands.js",
        chunkFileNames: "chunks/[name]-[hash].js",
				assetFileNames: "assets/[name].[ext]" // 👈 no hash
      }
    }
  }
})