import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { languages, pageFiles, outputFile, pagePath, localeTags, locationLabel } from '../src/siteRoutes.js'
import { translations } from '../src/i18n.js'

for (const language of languages) {
  for (const file of pageFiles) {
    const entry = outputFile(language, file)
    test(entry + ' has static translated content and reciprocal language metadata', async () => {
      const html = await readFile('dist/' + entry, 'utf8')
      assert.ok(html.includes('<html lang="' + localeTags[language] + '">'))
      const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]
      const t = translations[language]
      assert.equal(h1, file === 'index.html' ? t.home.heroTitle : file === 'blog.html' ? t.blog.title : t.privacy.title)
      assert.ok(html.includes(locationLabel(language)))
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1]
      const origin = new URL(canonical).origin
      assert.equal(canonical, origin + pagePath(language, file))
      for (const alternate of languages) {
        assert.ok(html.includes('hreflang="' + localeTags[alternate] + '" href="' + origin + pagePath(alternate, file) + '"'))
      }
      assert.ok(html.includes('hreflang="x-default" href="' + origin + pagePath('pt', file) + '"'))
      assert.match(html, /class="language-toggle nav-language"/)
      assert.ok(html.includes('aria-current="page"'))
      assert.doesNotMatch(html, /(?:src|href)="\.\/assets\//)
      const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
      const legal = data['@graph'].find((entry) => entry['@type'] === 'LegalService')
      assert.equal(legal.areaServed.name, 'Manaus')
      assert.equal(legal.telephone, '+5592984442917')
      assert.equal(legal.address, undefined)
      assert.equal(legal.openingHours, undefined)
      assert.equal(data['@graph'].find((entry) => entry['@type'] === 'WebPage').inLanguage, localeTags[language])
    })
  }
}
