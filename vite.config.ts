import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // IMPORTANT for GitHub Pages
  base: '/mupuma-website/',

  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  build: {
//     outDir: 'dist',  
  },
})