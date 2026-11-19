import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { test } from 'node:test'

test('Manrope is served from a hashed local WOFF2 without remote font CSS', async () => {
  const files = await readdir('dist/assets')
  const font = files.find((file) => /^manrope-variable-[\w-]{8}\.woff2$/.test(file))
  assert.ok(font, 'Local variable WOFF2 missing from build')
  const bytes = await readFile(`dist/assets/${font}`)
  assert.equal(bytes.subarray(0, 4).toString(), 'wOF2')
  const css = (await Promise.all(files.filter((file) => file.endsWith('.css')).map((file) => readFile(`dist/assets/${file}`, 'utf8')))).join('\n')
  assert.ok(css.includes(font))
  assert.match(css, /font-display:swap/)
  assert.doesNotMatch(css, /fonts\.(googleapis|gstatic)\.com/)
  const license = await readFile('dist/licenses/manrope-OFL.txt', 'utf8')
  assert.ok(license.includes('SIL OPEN FONT LICENSE Version 1.1'))
})
