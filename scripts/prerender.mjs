import { mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { structuredData } from './structured-data.mjs'
import { translations } from '../src/i18n.js'
import { languages, pageFiles, pagePath, localeTags, ogLocales, localTitles } from '../src/siteRoutes.js'

const output = await mkdtemp(join('node_modules', '.site-deb-ssg-'))
const siteUrl = new URL(process.env.SITE_URL || 'https://deborapaiva.adv.br')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
try {
  const templates = Object.fromEntries(await Promise.all(pageFiles.map(async (file) => [file, await readFile(join('dist', file), 'utf8')])))
  const robots = await readFile('public/robots.txt', 'utf8')
  await writeFile('dist/robots.txt', robots.replaceAll('https://deborapaiva.adv.br', siteUrl.origin))
  const locations = languages.flatMap((language) => pageFiles.map((file) => new URL(pagePath(language, file), siteUrl).href))
  await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    locations.map((url) => '  <url><loc>' + escape(url) + '</loc></url>').join('\n') + '\n</urlset>\n')

  await build({
    build: {
      ssr: 'src/prerender.jsx',
      outDir: output,
      rollupOptions: { input: 'src/prerender.jsx' },
    },
  })
  const { renderPages, media } = await import(pathToFileURL(join(output, 'prerender.js')))
  for (const [entry, content] of Object.entries(renderPages())) {
    const parts = entry.split('/')
    const language = parts.length === 1 ? 'pt' : parts[0]
    const file = parts.at(-1)
    const t = translations[language]
    let template = templates[file]
    const title = file === 'index.html' ? localTitles[language] :
      (file === 'blog.html' ? t.common.nav.blog : t.privacy.title) + ' | Débora Paiva Advocacia'
    const description = file === 'index.html' ? t.home.heroText :
      file === 'blog.html' ? t.blog.title : t.privacy.intro
    const url = new URL(pagePath(language, file), siteUrl).href
    const image = new URL(media.portrait, siteUrl).href
    template = template.replace('<html lang="pt-BR">', '<html lang="' + localeTags[language] + '">')
      .replace(/<title>.*?<\/title>/s, () => '<title>' + escape(title) + '</title>')
      .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/s, (_, start, end) => start + escape(description) + end)
    const tags = [
      '<script type="application/ld+json">' + JSON.stringify(structuredData(siteUrl, language, file, media.portrait)).replaceAll('<', '\\u003c') + '</script>',
      '<link rel="canonical" href="' + escape(url) + '" />',
      ...languages.map((code) => '<link rel="alternate" hreflang="' + localeTags[code] + '" href="' + escape(new URL(pagePath(code, file), siteUrl).href) + '" />'),
      '<link rel="alternate" hreflang="x-default" href="' + escape(new URL(pagePath('pt', file), siteUrl).href) + '" />',
      ...Object.entries({
        'og:type': 'website', 'og:locale': ogLocales[language],
        'og:site_name': 'Débora Paiva Advocacia', 'og:title': title,
        'og:description': description, 'og:url': url, 'og:image': image,
        'og:image:alt': t.home.aboutPhotoAlt,
      }).map(([property, value]) => '<meta property="' + property + '" content="' + escape(value) + '" />'),
      ...languages.filter((code) => code !== language).map((code) => '<meta property="og:locale:alternate" content="' + ogLocales[code] + '" />'),
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="twitter:title" content="' + escape(title) + '" />',
      '<meta name="twitter:description" content="' + escape(description) + '" />',
      '<meta name="twitter:image" content="' + escape(image) + '" />',
    ].join('\n    ')
    template = template.replace('</head>', tags + '\n  </head>')
    const placeholder = '<div id="root"></div>'
    if (!template.includes(placeholder)) throw new Error('Missing root placeholder: ' + entry)
    const path = join('dist', entry)
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, template.replace(placeholder, () => '<div id="root">' + content + '</div>'))
    console.log('Pre-rendered ' + entry)
  }
} finally {
  await rm(output, { recursive: true, force: true })
}
