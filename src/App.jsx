import { media } from './media.js'
import LanguageLinks from './LanguageLinks.jsx'
import { locationLabel } from './siteRoutes.js'
import { business } from './business.js'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import PrivacyBanner from './PrivacyBanner.jsx'
import WhatsAppModal from './WhatsAppModal.jsx'
import { buildWhatsAppMessage, translations } from './i18n.js'
import { useMediaQuery } from './useMediaQuery.js'
import HeroBackground from './HeroBackground.jsx'

const contact = business

const whatsappBaseLink = `https://wa.me/${contact.whatsappNumber}`

function App({ language = 'pt' }) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [hasStartedIndicators, setHasStartedIndicators] = useState(false)

  const t = translations[language]
  const { common, home } = t
  const indicators = home.indicators
  const [indicatorValues, setIndicatorValues] = useState(() => indicators.map((item) => item.value))

  const indicatorsRef = useRef(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', true)

  useEffect(() => {
    if (hasStartedIndicators) return
    if (!indicatorsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStartedIndicators(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(indicatorsRef.current)
    return () => observer.disconnect()
  }, [hasStartedIndicators])

  useEffect(() => {
    if (!hasStartedIndicators || reducedMotion) return

    let frameId
    const duration = 2600
    const startDelay = 220
    const startTime = performance.now() + startDelay

    const animate = (now) => {
      if (now < startTime) {
        frameId = window.requestAnimationFrame(animate)
        return
      }

      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setIndicatorValues(indicators.map((item) => Math.round(item.value * eased)))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [hasStartedIndicators, indicators, reducedMotion])

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
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    closeWhatsAppModal()
  }

  return (
    <div className="page-shell">
      <main>
        <div className="hero-stage">
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
                  <a href="#sobre">{common.nav.about}</a>
                  <a href="#atuacao">{common.nav.practice}</a>
                  <a href="#metodo">{common.nav.method}</a>
                  <a href="./blog.html">{common.nav.blog}</a>
                </nav>

                <a href="#inicio" className="brand brand-center" aria-label={common.nav.homeAria}>
                  <img src={media.headerLogo} alt={common.brandAlt} />
                </a>

                <div className="nav-group nav-right">
                  <button type="button" className="nav-text-link nav-text-link-disabled" aria-disabled="true" disabled>
                    {common.nav.enter}
                  </button>
                  <LanguageLinks language={language} file="index.html" label={common.nav.languageAria} />
                  <a
                    className="button button-small nav-cta"
                    href={whatsappBaseLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={openWhatsAppModal}
                    aria-label={home.navContactAria}
                  >
                    {common.nav.contact} <span className="cta-arrow">→</span>
                  </a>
                </div>

                <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'is-open' : ''}`}>
                  <a href="#sobre" onClick={closeMobileMenu}>
                    {common.nav.about}
                  </a>
                  <a href="#atuacao" onClick={closeMobileMenu}>
                    {common.nav.practice}
                  </a>
                  <a href="#metodo" onClick={closeMobileMenu}>
                    {common.nav.method}
                  </a>
                  <a href="./blog.html" onClick={closeMobileMenu}>
                    {common.nav.blog}
                  </a>
                  <span className="mobile-menu-disabled">{common.nav.enter}</span>
                  <LanguageLinks language={language} file="index.html" label={common.nav.languageAria} mobile />
                  <a className="button button-small" href={whatsappBaseLink} target="_blank" rel="noreferrer" onClick={openWhatsAppModal}>
                    {common.nav.contact}
                  </a>
                </div>
              </div>
              <button type="button" className="nav-restore-toggle" aria-label={common.nav.expandAria} onClick={expandNavbar}>
                ↓
              </button>
            </div>
          </header>

          <section id="inicio" className="hero-section">
            <HeroBackground />

            <div className="container hero-layout">
              <div className="hero-copy fade-in-up">
                <p className="eyebrow">{home.heroEyebrow}</p>
                <h1>{home.heroTitle}</h1>
                <p>{home.heroText}</p>

                <div className="hero-actions">
                  <a className="button" href={whatsappBaseLink} target="_blank" rel="noreferrer" onClick={openWhatsAppModal}>
                    {home.heroPrimaryCta}
                  </a>
                  <a className="button button-ghost" href="#atuacao">
                    {home.heroSecondaryCta}
                  </a>
                </div>
              </div>

              <aside className="hero-panel fade-in-up delay-1">
                <p className="eyebrow">{home.panelEyebrow}</p>
                <h2>{home.panelTitle}</h2>
                <ul>
                  {home.panelItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        </div>

        <div className="white-surface">
          <section id="sobre" className="section-block about-block">
            <div className="container about-layout">
              <figure className="about-photo fade-in-up">
                <img src={media.portrait} alt={home.aboutPhotoAlt} loading="lazy" />
              </figure>

              <div className="about-copy fade-in-up delay-1">
                <p className="eyebrow">{home.aboutEyebrow}</p>
                <h2>{home.aboutTitle}</h2>
                {home.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="about-topics">
                  {home.aboutTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="indicators-band" ref={indicatorsRef}>
            <div className="container indicators-grid">
              {indicators.map((item, index) => (
                <article className="indicator-card" key={`${item.label}-${index}`}>
                  <p className="indicator-number">+{reducedMotion ? item.value : indicatorValues[index]}</p>
                  <p className="indicator-label">{item.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="atuacao" className="section-block atuacao-block">
            <div className="container">
              <div className="section-heading fade-in-up">
                <p className="eyebrow">{home.practiceEyebrow}</p>
                <h2>{home.practiceTitle}</h2>
              </div>

              <div className="service-grid">
                {home.serviceCards.map((card, index) => (
                  <article
                    className={`service-card fade-in-up ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`}
                    key={card.title}
                  >
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="status-grid">
                {home.statusPhrases.map((phrase) => (
                  <p key={phrase}>{phrase}</p>
                ))}
              </div>
            </div>
          </section>

          <section id="metodo" className="section-block method-block">
            <div className="container">
              <div className="section-heading fade-in-up">
                <p className="eyebrow">{home.methodEyebrow}</p>
                <h2>{home.methodTitle}</h2>
              </div>

              <div className="steps-grid">
                {home.processSteps.map((step, index) => (
                  <article
                    className={`step-card fade-in-up ${index === 1 ? 'delay-1' : index >= 2 ? 'delay-2' : ''}`}
                    key={step.number}
                  >
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="section-block">
            <div className="container faq-layout">
              <div className="faq-left">
                <div className="section-heading fade-in-up">
                  <p className="eyebrow">{home.faqEyebrow}</p>
                  <h2>{home.faqTitle}</h2>
                </div>

                <div className="faq-list fade-in-up delay-1">
                  {home.faqItems.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <figure className="faq-image fade-in-up delay-2">
                <img src={media.faq} alt={home.faqImageAlt} loading="lazy" />
              </figure>
            </div>
          </section>
        </div>
      </main>

      <div className="footer-side-row">
        <div className="container">
          <div className="footer-right">
            <a className="footer-brand-link" href="#inicio" aria-label={common.brandAlt}>
              <img src={media.footerLogo} alt={common.brandAlt} />
            </a>
            <span className="logo-oab logo-oab-footer footer-oab-center">OAB/AM 17.317</span>
            <div className="footer-contact-group">
              <div className="footer-contact">
                <a className="footer-contact-item" href={`mailto:${contact.email}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
                    <path
                      fill="currentColor"
                      d="M4 5h16a2 2 0 0 1 2 2v.35l-10 6.1L2 7.35V7a2 2 0 0 1 2-2Zm18 4.7v7.3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.7l9.48 5.79a1 1 0 0 0 1.04 0L22 9.7Z"
                    />
                  </svg>
                  <span>{contact.email}</span>
                </a>
                <a className="footer-contact-item" href={whatsappBaseLink} target="_blank" rel="noreferrer" onClick={openWhatsAppModal}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
                    <path
                      fill="currentColor"
                      d="M6.6 2h2.3a1.2 1.2 0 0 1 1.16.9l.7 2.8a1.2 1.2 0 0 1-.35 1.16L9 8.2a13.6 13.6 0 0 0 6.8 6.8l1.36-1.41a1.2 1.2 0 0 1 1.16-.35l2.8.7a1.2 1.2 0 0 1 .9 1.16v2.3A2.5 2.5 0 0 1 19.52 20C9.88 20 4 14.12 4 6.48A2.5 2.5 0 0 1 6.6 2Z"
                    />
                  </svg>
                  <span>{contact.whatsappDisplay}</span>
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
                  href={contact.instagramUrl}
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
                  <span>{contact.instagramDisplay}</span>
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

export default App
