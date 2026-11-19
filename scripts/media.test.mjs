import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { test } from 'node:test'
import { languages, pageFiles, outputFile } from '../src/siteRoutes.js'

test('all public pages use versioned images and matching social/schema portraits', async () => {
  const assets = await readdir('dist/assets')
  const portrait = assets.find((file) => /^debora-sobre-[\w-]{8}\.jpeg$/.test(file))
  assert.ok(portrait)
  for (const language of languages) {
    for (const file of pageFiles) {
      const html = await readFile(`dist/${outputFile(language, file)}`, 'utf8')
      for (const image of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
        assert.match(image[1], /^\/assets\/.+-[\w-]{8}\.(png|jpe?g)$/)
        await access(`dist${image[1]}`)
      }
      assert.match(html, /rel="icon"[^>]+href="\/assets\/logo-[\w-]{8}\.ico"/)
      const social = html.match(/property="og:image" content="([^"]+)"/)[1]
      assert.equal(new URL(social).pathname, `/assets/${portrait}`)
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
      assert.equal(schema['@graph'].find((entry) => entry['@type'] === 'LegalService').image, social)
    }
  }
  for (const name of ['debora-sobre.jpeg', 'hero-background-optimized.mp4', 'logo.ico']) {
    assert.ok(!assets.includes(name), `Unversioned media still served: ${name}`)
  }
})
