import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
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
