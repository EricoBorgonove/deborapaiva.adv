import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { languages, pageFiles, outputFile } from '../src/siteRoutes.js'

test('crawler files contain text/XML and reference built canonical pages', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8')
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.match(robots, /^User-agent: \*/)
  assert.doesNotMatch(robots + sitemap, /<!doctype html>/i)
  assert.match(sitemap, /^<\?xml/)
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert.equal(locations.length, 12)
  assert.equal(new Set(locations).size, 12)
  for (const file of languages.flatMap((language) => pageFiles.map((file) => outputFile(language, file)))) {
    const html = await readFile(`dist/${file}`, 'utf8')
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1]
    assert.ok(locations.includes(canonical), canonical)
    assert.ok(robots.includes(`${new URL(canonical).origin}/sitemap.xml`))
  }
})
