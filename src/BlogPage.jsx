import { media } from './media.js'
import LanguageLinks from './LanguageLinks.jsx'
import { locationLabel } from './siteRoutes.js'
import { business } from './business.js'
import { useState } from 'react'
import './App.css'
import PrivacyBanner from './PrivacyBanner.jsx'
import WhatsAppModal from './WhatsAppModal.jsx'
import { buildWhatsAppMessage, translations } from './i18n.js'

const footerContact = business

const whatsappBaseLink = `https://wa.me/${footerContact.whatsappNumber}`

function BlogPage({ language = 'pt' }) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

  const t = translations[language]
  const { common, blog } = t

  function openWhatsAppModal(event) {
    if (event) event.preventDefault()
    setIsMobileMenuOpen(false)
    setIsWhatsAppModalOpen(true)
  }

  function closeWhatsAppModal() {
    setIsWhatsAppModalOpen(false)
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  function collapseNavbar() {
    setIsMobileMenuOpen(false)
    setIsNavCollapsed(true)
  }

  function expandNavbar() {
    setIsNavCollapsed(false)
  }

  function handleWhatsAppSubmit({ name, subject }) {
    const message = buildWhatsAppMessage(language, { name, subject })
    const url = `https://wa.me/${footerContact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    closeWhatsAppModal()
  }

  return (
    <div className="page-shell blog-page-shell">
      <header className="site-header">
        <div className={`nav-shell ${isNavCollapsed ? 'is-collapsed' : ''}`}>
          <div className="nav-row">
            <button
              type="button"
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
              aria-label={common.nav.openMenuAria}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span />
              <span />
              <span />
            </button>

            <button type="button" className="nav-collapse-toggle" aria-label={common.nav.collapseAria} onClick={collapseNavbar}>
              ↑
            </button>

            <nav className="nav-group nav-left" aria-label={common.nav.mainAria}>
              <a href="./index.html#sobre">{common.nav.about}</a>
              <a href="./index.html#atuacao">{common.nav.practice}</a>
              <a href="./index.html#metodo">{common.nav.method}</a>
              <a href="./blog.html">{common.nav.blog}</a>
            </nav>

            <a href="./index.html#inicio" className="brand brand-center" aria-label={common.nav.homeAria}>
              <img src={media.headerLogo} alt={common.brandAlt} />
            </a>

            <div className="nav-group nav-right">
              <button type="button" className="nav-text-link nav-text-link-disabled" aria-disabled="true" disabled>
                {common.nav.enter}
              </button>
                  <LanguageLinks language={language} file="blog.html" label={common.nav.languageAria} />
              <a className="button button-small nav-cta" href="./index.html#inicio">
                {common.nav.backToSite} <span className="cta-arrow">→</span>
              </a>
            </div>

            <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'is-open' : ''}`}>
              <a href="./index.html#sobre" onClick={closeMobileMenu}>
                {common.nav.about}
              </a>
              <a href="./index.html#atuacao" onClick={closeMobileMenu}>
                {common.nav.practice}
              </a>
              <a href="./index.html#metodo" onClick={closeMobileMenu}>
                {common.nav.method}
              </a>
              <a href="./blog.html" onClick={closeMobileMenu}>
                {common.nav.blog}
              </a>
              <span className="mobile-menu-disabled">{common.nav.enter}</span>
                  <LanguageLinks language={language} file="blog.html" label={common.nav.languageAria} mobile />
              <a className="button button-small" href="./index.html#inicio" onClick={closeMobileMenu}>
                {common.nav.backToSite}
              </a>
            </div>
          </div>
          <button type="button" className="nav-restore-toggle" aria-label={common.nav.expandAria} onClick={expandNavbar}>
            ↓
          </button>
        </div>
      </header>

      <main className="blog-page-main">
        <section className="section-block blog-page-section">
          <div className="container">
            <div className="section-heading fade-in-up">
              <p className="eyebrow">{common.nav.blog}</p>
              <h1 className="blog-page-title">{blog.title}</h1>
              <p className="blog-page-subtitle">{blog.subtitle}</p>
            </div>

            <div className="blog-grid">
              {blog.posts.map((post, index) => (
                <article
                  className={`blog-card fade-in-up ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`}
                  key={post.title}
                >
                  <p className="blog-category">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p className="blog-coming">{blog.comingSoon}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="footer-side-row">
        <div className="container">
          <div className="footer-right">
            <a className="footer-brand-link" href="./index.html#inicio" aria-label={common.brandAlt}>
              <img src={media.footerLogo} alt={common.brandAlt} />
            </a>
            <span className="logo-oab logo-oab-footer footer-oab-center">OAB/AM 17.317</span>
            <div className="footer-contact-group">
              <div className="footer-contact">
                <a className="footer-contact-item" href={`mailto:${footerContact.email}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
                    <path
                      fill="currentColor"
                      d="M4 5h16a2 2 0 0 1 2 2v.35l-10 6.1L2 7.35V7a2 2 0 0 1 2-2Zm18 4.7v7.3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.7l9.48 5.79a1 1 0 0 0 1.04 0L22 9.7Z"
                    />
                  </svg>
                  <span>{footerContact.email}</span>
                </a>
                <a className="footer-contact-item" href={whatsappBaseLink} target="_blank" rel="noreferrer" onClick={openWhatsAppModal}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
                    <path
                      fill="currentColor"
                      d="M6.6 2h2.3a1.2 1.2 0 0 1 1.16.9l.7 2.8a1.2 1.2 0 0 1-.35 1.16L9 8.2a13.6 13.6 0 0 0 6.8 6.8l1.36-1.41a1.2 1.2 0 0 1 1.16-.35l2.8.7a1.2 1.2 0 0 1 .9 1.16v2.3A2.5 2.5 0 0 1 19.52 20C9.88 20 4 14.12 4 6.48A2.5 2.5 0 0 1 6.6 2Z"
                    />
                  </svg>
                  <span>{footerContact.whatsappDisplay}</span>
                </a>
                <span className="footer-contact-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
                    <path
                      fill="currentColor"
                      d="M12 2a7 7 0 0 1 7 7c0 4.6-5.3 10.8-6.4 12a.8.8 0 0 1-1.2 0C10.3 19.8 5 13.6 5 9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5c0 2.9 3 7.1 5 9.6 2-2.5 5-6.7 5-9.6a5 5 0 0 0-5-5Zm0 2.5A2.5 2.5 0 1 1 9.5 9 2.5 2.5 0 0 1 12 6.5Z"
                    />
                  </svg>
                  <span>{locationLabel(language)}</span>
                </span>
                <a
                  className="footer-contact-item footer-insta-link"
                  href={footerContact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="insta-icon">
                    <path
                      fill="currentColor"
                      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.4-2.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                    />
                  </svg>
                  <span>{footerContact.instagramDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <hr className="footer-divider" />
          <div className="footer-content">
            <a className="footer-dev-link footer-dev-left" href="https://borgonove.com" target="_blank" rel="noreferrer">
              {common.footer.developedBy}
            </a>
            <p className="footer-copy">
              © {new Date().getFullYear()} Débora Paiva Advocacia. {common.footer.rights}
            </p>
            <a className="footer-privacy-link" href="./privacy.html">
              {common.footer.privacy}
            </a>
          </div>
        </div>
      </footer>

      <PrivacyBanner labels={common.privacyBanner} />
      {isWhatsAppModalOpen ? (
        <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={closeWhatsAppModal} onSubmit={handleWhatsAppSubmit} labels={common.whatsappModal} />
      ) : null}
      <div className="fixed-frame" aria-hidden="true">
        <span className="frame-side frame-top" />
        <span className="frame-side frame-right" />
        <span className="frame-side frame-bottom" />
        <span className="frame-side frame-left" />
        <span className="frame-corner frame-tl" />
        <span className="frame-corner frame-tr" />
        <span className="frame-corner frame-bl" />
        <span className="frame-corner frame-br" />
      </div>
    </div>
  )
}

export default BlogPage
