import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { structuredData } from './structured-data.mjs'

const output = await mkdtemp(join('node_modules', '.site-deb-ssg-'))
const siteUrl = new URL(process.env.SITE_URL || 'https://deborapaiva.adv.br')
for (const file of ['robots.txt', 'sitemap.xml']) {
  const path = join('dist', file)
  const content = await readFile(path, 'utf8')
  await writeFile(path, content.replaceAll('https://deborapaiva.adv.br', siteUrl.origin))
}
try {
  await build({
    build: {
      ssr: 'src/prerender.jsx',
      outDir: output,
      rollupOptions: { input: 'src/prerender.jsx' },
    },
  })
  const { renderPages } = await import(pathToFileURL(join(output, 'prerender.js')))
  for (const [file, content] of Object.entries(renderPages())) {
    const path = join('dist', file)
    let template = await readFile(path, 'utf8')
    const title = template.match(/<title>(.*?)<\/title>/s)[1]
    const description = template.match(/name="description"\s+content="([^"]+)"/s)[1]
    const url = new URL(file === 'index.html' ? '/' : `/${file}`, siteUrl).href
    const image = new URL('/assets/debora-sobre.jpeg', siteUrl).href
    const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
    const tags = [
      `<script type="application/ld+json">${JSON.stringify(structuredData(siteUrl)).replaceAll('<', '\\u003c')}</script>`,
      `<link rel="canonical" href="${escape(url)}" />`,
      ...Object.entries({
        'og:type': 'website', 'og:locale': 'pt_BR',
        'og:site_name': 'Débora Paiva Advocacia', 'og:title': title,
        'og:description': description, 'og:url': url, 'og:image': image,
        'og:image:alt': 'Dra. Débora Paiva, advogada em Manaus',
      }).map(([property, value]) => `<meta property="${property}" content="${escape(value)}" />`),
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escape(title)}" />`,
      `<meta name="twitter:description" content="${escape(description)}" />`,
      `<meta name="twitter:image" content="${escape(image)}" />`,
    ].join('\n    ')
    template = template.replace('</head>', `${tags}\n  </head>`)
    const placeholder = '<div id="root"></div>'
    if (!template.includes(placeholder)) throw new Error(`Missing root placeholder: ${file}`)
    await writeFile(path, template.replace(placeholder, () => `<div id="root">${content}</div>`))
    console.log(`Pre-rendered ${file}`)
  }
} finally {
  await rm(output, { recursive: true, force: true })
}
