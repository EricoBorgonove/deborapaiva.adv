import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

for (const file of ['index.html', 'blog.html', 'privacy.html']) {
  test(`${file} has Portuguese content and verified local business data`, async () => {
    const html = await readFile(`dist/${file}`, 'utf8')
    assert.match(html, /<html lang="pt-BR">/)
    assert.doesNotMatch(html, /class="(?:nav-language|mobile-language-toggle)/)
    assert.doesNotMatch(html, /hreflang="(?:en|es|fr)"/)
    assert.ok(html.includes('atendimento somente com hora marcada'))
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    assert.ok(json)
    const data = JSON.parse(json[1])
    const legal = data['@graph'].find((entry) => entry['@type'] === 'LegalService')
    assert.equal(legal.areaServed.name, 'Manaus')
    assert.equal(legal.telephone, '+5592984442917')
    assert.equal(legal.contactPoint.availableLanguage, 'pt-BR')
    assert.equal(legal.address, undefined, 'No unconfirmed physical address')
    assert.equal(legal.openingHours, undefined, 'No invented opening hours')
    assert.equal(new URL(legal.url).origin, new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).origin)
  })
}
