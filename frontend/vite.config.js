import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../src/interface/static',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/diagnostico': 'http://localhost:8000',
    }
  }
})
