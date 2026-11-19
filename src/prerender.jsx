import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import BlogPage from './BlogPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'

export function renderPages() {
  return {
    'index.html': renderToString(<App />),
    'blog.html': renderToString(<BlogPage />),
    'privacy.html': renderToString(<PrivacyPage />),
  }
}
