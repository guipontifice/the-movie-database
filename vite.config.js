import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/the-movie-database/',
  build: {
    outDir: 'dist',
    manifest: true, 
    input: 'src/index.html'
  }
})
