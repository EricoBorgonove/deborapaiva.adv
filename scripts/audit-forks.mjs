const repository = 'EricoBorgonove/deborapaiva.adv'
const headers = { Accept: 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
let count = 0
for (let page = 1; ; page++) {
  const response = await fetch(`https://api.github.com/repos/${repository}/forks?per_page=100&page=${page}`, { headers })
  if (!response.ok) throw new Error(`GitHub forks audit failed: HTTP ${response.status}`)
  const forks = await response.json()
  for (const fork of forks) console.log(fork.full_name)
  count += forks.length
  if (forks.length < 100) break
}
console.log(`Public forks: ${count}; checked at ${new Date().toISOString()}`)
if (count > 0) process.exitCode = 1
