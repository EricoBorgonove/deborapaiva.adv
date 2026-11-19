import { media } from './media.js'
import { business } from './business.js'
const footerContact = business

function InternalSiteFooter() {
  return (
    <div className="internal-site-footer">
      <div className="footer-side-row">
        <div className="container">
          <div className="footer-right">
            <a className="footer-brand-link" href="/" aria-label="Débora Paiva Advocacia">
              <img src={media.footerLogo} alt="Débora Paiva Advocacia" />
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
                <a
                  className="footer-contact-item"
                  href={`https://wa.me/${footerContact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
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
                  <span>{footerContact.cityDisplay}</span>
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
              Desenvolvido por borgonove.com
            </a>
            <p className="footer-copy">
              © {new Date().getFullYear()} Débora Paiva Advocacia. Todos os direitos reservados.
            </p>
            <a className="footer-privacy-link" href="/privacy.html">
              Aviso de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InternalSiteFooter
