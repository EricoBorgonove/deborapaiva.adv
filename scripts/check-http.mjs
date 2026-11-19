import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'

const base = process.env.BASE_URL || 'http://127.0.0.1:4180'
const assets = await readdir('dist/assets')
const hashed = assets.find((file) => /-[a-z0-9_-]{8}\.js$/i.test(file))
const font = assets.find((file) => file.endsWith('.woff2'))
assert.ok(hashed, 'Built hashed bundle missing')
assert.ok(font, 'Built local font missing')
for (const [path, status, type, cache] of [
  ['/', 200, 'text/html', 'no-cache'],
  ['/blog', 200, 'text/html', 'no-cache'],
  ['/privacy', 200, 'text/html', 'no-cache'],
  ['/en/', 200, 'text/html', 'no-cache'],
  ['/es/blog.html', 200, 'text/html', 'no-cache'],
  ['/fr/privacy.html', 200, 'text/html', 'no-cache'],
  ['/en/not-a-page', 404, 'text/html', 'no-store'],
  ['/robots.txt', 200, 'text/plain', 'no-cache'],
  ['/sitemap.xml', 200, 'application/xml', 'no-cache'],
  ['/does-not-exist', 404, 'text/html', 'no-store'],
  ['/assets/missing.js', 404, 'text/html', 'no-store'],
  ['/data/participantes.json', 410, 'text/html', 'no-store'],
  ['/sorteio', 410, 'text/html', 'no-store'],
  ['/assets/debora-sobre.jpeg', 200, 'image/jpeg', 'max-age=3600'],
  [`/assets/${hashed}`, 200, 'javascript', 'immutable'],
  [`/assets/${font}`, 200, 'font/woff2', 'immutable'],
]) {
  const response = await fetch(new URL(path, base))
  assert.equal(response.status, status, path)
  assert.ok(response.headers.get('content-type').includes(type), path)
  assert.ok(response.headers.get('cache-control').includes(cache), path)
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path)
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path)
  assert.ok(response.headers.get('content-security-policy').includes("frame-ancestors 'none'"), path)
  assert.ok(response.headers.get('content-security-policy').includes("font-src 'self';"), path)
  assert.ok(response.headers.get('content-security-policy').includes("style-src 'self';"), path)
  assert.ok(!response.headers.get('content-security-policy').includes('google'), path)
  console.log(`${path}: ${status}; headers and cache OK`)
}
const secure = await fetch(base, { headers: { 'X-Forwarded-Proto': 'https' } })
assert.equal(secure.headers.get('strict-transport-security'), 'max-age=31536000')
const html = await fetch(base)
const revalidated = await fetch(base, { headers: { 'If-None-Match': html.headers.get('etag') } })
assert.equal(revalidated.status, 304)
assert.equal(revalidated.headers.get('x-content-type-options'), 'nosniff')
console.log('HTTPS HSTS and conditional HTML revalidation: OK')
