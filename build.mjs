// Builds docs/ (what GitHub Pages serves) from pages/ and site.json. No dependencies: `node build.mjs`.
// Each page starts with a front line: <!-- title: Privacy | nav: privacy -->
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'

const site = JSON.parse(readFileSync('site.json', 'utf8'))
const nav = [
  ['index', 'Home', './'],
  ['privacy', 'Privacy', 'privacy.html'],
  ['terms', 'Terms', 'terms.html'],
  ['support', 'Support', 'support.html'],
]
const fill = (s) =>
  s
    .replaceAll('{{app}}', site.app)
    .replaceAll('{{operator}}', site.operator)
    .replaceAll('{{email}}', site.email)
    .replaceAll('{{mailto}}', `<a href="mailto:${site.email}">${site.email}</a>`)
    .replaceAll('{{updated}}', site.updated)

const draft = site.draft
  ? '<p class="draft" role="note"><strong>Draft.</strong> This page has not been reviewed yet and may change before Pip Learning is in the App Store.</p>'
  : ''

for (const file of readdirSync('pages').filter((f) => f.endsWith('.html'))) {
  const raw = readFileSync(`pages/${file}`, 'utf8')
  const [, title, current] = raw.match(/^<!-- title: (.+?) \| nav: (\w+) -->\n/) ?? []
  if (!title) throw new Error(`${file}: missing the front line`)
  const body = fill(raw.slice(raw.indexOf('\n') + 1))
  const links = nav
    .map(([id, label, href]) => `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('\n      ')
  const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fill(title)}</title>
  <meta name="description" content="Pip Learning: free practice in English, math, science and history for kids, with Pip the sea otter.">
  <meta name="referrer" content="no-referrer">
  <link rel="icon" href="assets/pip.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <div class="wrap">
    <header class="top">
      <img src="assets/pip.svg" alt="" width="56" height="56">
      <a class="home" href="./">${site.app}</a>
    </header>
    <nav class="links" aria-label="Pages">
      ${links}
    </nav>
    <main class="sheet">
      ${draft}
${body.trimEnd()}
    </main>
    <footer>
      <p>${site.app} has no ads, no tracking and nothing to buy. This site has no cookies or analytics either.</p>
    </footer>
  </div>
</body>
</html>
`
  writeFileSync(`docs/${file}`, page)
  console.log(`docs/${file}`)
}
