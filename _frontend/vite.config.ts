import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/react/",
  build: {
    outDir: "../static/react",
    emptyOutDir: true,
		cssCodeSplit: false,
    rollupOptions: {
      input: "./islands.tsx",
      output: {
        entryFileNames: "islands.js",
        chunkFileNames: "chunks/[name]-[hash].js",
				assetFileNames: "assets/[name].[ext]"
      }
    }
  }
})