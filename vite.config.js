import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // Change default port from 5173 to 3000
    open: true,        // Automatically open browser on server start
  },
  build: {
    outDir: 'dist',    // Output directory for production build
    sourcemap: false,  // Disable source maps in production
  },
  base: './'
})
