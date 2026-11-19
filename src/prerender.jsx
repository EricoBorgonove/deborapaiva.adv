import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import BlogPage from './BlogPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import { languages, outputFile } from './siteRoutes.js'

export function renderPages() {
  const pages = {}
  for (const language of languages) {
    pages[outputFile(language, 'index.html')] = renderToString(<App language={language} />)
    pages[outputFile(language, 'blog.html')] = renderToString(<BlogPage language={language} />)
    pages[outputFile(language, 'privacy.html')] = renderToString(<PrivacyPage language={language} />)
  }
  return pages
}
