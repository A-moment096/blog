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
      input: {
			islands: "./islands.tsx",
			runtime: "./runtime.tsx",
			registry: "./registry.ts",
		},
      output: {
			entryFileNames: (chunk) => {
				if (chunk.name === "islands") return "islands.js"
				if (chunk.name === "runtime") return "runtime.js"
				if (chunk.name === "registry") return "registry.js"
				return "entries/[name]-[hash].js"
			},
        chunkFileNames: "chunks/[name]-[hash].js",
				assetFileNames: "assets/[name].[ext]"
      }
    }
  }
})