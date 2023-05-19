import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: "inject",
      transformIndexHtml() {
        return [{
          tag: "script",
          attrs: { defer: true, src: "/scripts/detectAdBlock.js"}
        }]
      }
    }],
})
