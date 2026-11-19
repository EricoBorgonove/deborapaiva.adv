import { execFileSync } from 'node:child_process'

const objects = execFileSync('git', ['rev-list', '--objects', '--all'], { encoding: 'utf8' })
const removedPaths = / (public\/data\/|sorteio\/|listagrande\/|listapequena\/|listaturma\/|src\/(SortearPage|SorteioAccessPage|sorteioAccess|sortear-main|sorteio-access-main))/
if (removedPaths.test(objects)) throw new Error('Removed paths are reachable in local history')
console.log('Removed paths absent from local reachable history.')
const headers = { Accept: 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
const response = await fetch('https://api.github.com/repos/EricoBorgonove/deborapaiva.adv/commits/1519c476bc833edf7b429d4904ea5d1e3e4d9794', { headers })
if (response.status === 404) console.log('Old commit is not publicly accessible through the API.')
else if (response.ok) {
  console.log('Old commit remains accessible: request GitHub cache cleanup. No content downloaded.')
  process.exitCode = 1
} else throw new Error(`GitHub history audit inconclusive: HTTP ${response.status}`)
