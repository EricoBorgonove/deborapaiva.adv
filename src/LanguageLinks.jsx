import { languages, localeTags, pagePath } from './siteRoutes.js'

function LanguageLinks({ language, file, label, mobile = false }) {
  return (
    <nav className={`language-toggle ${mobile ? 'mobile-language-toggle' : 'nav-language'}`} aria-label={label}>
      {languages.map((code) => (
        <a key={code} href={pagePath(code, file)} hrefLang={localeTags[code]} lang={localeTags[code]}
          className={code === language ? 'is-active' : ''} aria-current={code === language ? 'page' : undefined}>
          {code.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}

export default LanguageLinks
