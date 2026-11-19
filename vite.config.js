import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), {
    name: 'localized-dev-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0]
        if (/^\/(en|es|fr)$/.test(path)) {
          response.writeHead(302, { Location: `${path}/` })
          response.end()
          return
        }
        const match = path?.match(/^\/(en|es|fr)\/(?:(index|blog|privacy)(?:\.html)?)?$/)
        if (!match) return next()
        try {
          const file = fileURLToPath(new URL(`./${match[2] || 'index'}.html`, import.meta.url))
          const html = (await readFile(file, 'utf8')).replace('lang="pt-BR"', `lang="${match[1]}"`)
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(await server.transformIndexHtml(request.url, html))
        } catch (error) {
          next(error)
        }
      })
    },
  }],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        blog: fileURLToPath(new URL('./blog.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
      },
    },
  },
})
