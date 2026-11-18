import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        blog: fileURLToPath(new URL('./blog.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
        sorteio: fileURLToPath(new URL('./sorteio/index.html', import.meta.url)),
        listagrande: fileURLToPath(new URL('./listagrande/index.html', import.meta.url)),
        listapequena: fileURLToPath(new URL('./listapequena/index.html', import.meta.url)),
        listaturma: fileURLToPath(new URL('./listaturma/index.html', import.meta.url)),
      },
    },
  },
})
