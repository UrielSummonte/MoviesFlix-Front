import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,  // Puerto para desarrollo local
    strictPort: true,
  },
  preview: {
    port: 10000,  // Puerto que usa Render (importante!)
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    outDir: 'dist',  // Asegura la carpeta de build correcta
    emptyOutDir: true,  // Limpia el directorio en cada build
  }
})
