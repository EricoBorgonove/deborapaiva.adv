import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import { test } from 'node:test'

for (const [file, text] of [
  ['index.html', 'Atuação em Direito de Família'],
  ['blog.html', 'Direito de Família'],
  ['privacy.html', 'Aviso de Privacidade'],
]) {
  test(`${file} delivers readable content and sharing metadata without JavaScript`, async () => {
    const html = await readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8')
    const root = html.slice(html.indexOf('<div id="root">'))
    assert.match(root, /<h1[\s>]/)
    assert.ok(root.includes(text))
    assert.doesNotMatch(html, /<div id="root"><\/div>/)
    assert.match(html, /property="og:title" content="[^"]+"/)
    assert.match(html, /property="og:image" content="https:\/\//)
    assert.match(html, /rel="canonical" href="https:\/\//)
  })
}

test('hero stays below 1 MB and does not eagerly load video from static HTML', async () => {
  const assetDir = new URL('../dist/assets/', import.meta.url)
  const files = await readdir(assetDir)
  const videos = files.filter((file) => file.endsWith('.mp4'))
  assert.equal(videos.length, 1)
  assert.match(videos[0], /^hero-background-optimized-[\w-]{8}\.mp4$/)
  const video = await stat(new URL(videos[0], assetDir))
  assert.ok(video.size < 1_000_000, `Hero video exceeds budget: ${video.size} bytes`)
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.doesNotMatch(html, /<video[\s>]/)
})
