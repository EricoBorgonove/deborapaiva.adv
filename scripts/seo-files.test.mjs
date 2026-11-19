import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

test('crawler files contain text/XML and reference built canonical pages', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8')
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.match(robots, /^User-agent: \*/)
  assert.doesNotMatch(robots + sitemap, /<!doctype html>/i)
  assert.match(sitemap, /^<\?xml/)
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert.equal(locations.length, 3)
  for (const file of ['index.html', 'blog.html', 'privacy.html']) {
    const html = await readFile(`dist/${file}`, 'utf8')
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1]
    assert.ok(locations.includes(canonical), canonical)
    assert.ok(robots.includes(`${new URL(canonical).origin}/sitemap.xml`))
  }
})
