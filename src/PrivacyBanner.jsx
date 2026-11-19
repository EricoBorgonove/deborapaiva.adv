import { useSyncExternalStore } from 'react'

const CONSENT_KEY = 'debora_privacy_consent'

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('privacy-notice-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('privacy-notice-change', callback)
  }
}

function getVisible() {
  return window.localStorage.getItem(CONSENT_KEY) !== 'accepted'
}

const defaultLabels = {
  ariaLabel: 'Aviso de privacidade',
  textBeforeLink:
    'Este site armazena preferências no seu navegador, como o idioma e a confirmação deste aviso. Não utilizamos cookies de análise ou publicidade. Saiba mais no',
  linkLabel: 'Aviso de Privacidade',
  textAfterLink: '.',
  accept: 'Entendi',
}

function PrivacyBanner({ labels = defaultLabels }) {
  const visible = useSyncExternalStore(subscribe, getVisible, () => false)

  function handleAccept() {
    window.localStorage.setItem(CONSENT_KEY, 'accepted')
    window.dispatchEvent(new Event('privacy-notice-change'))
  }

  if (!visible) return null

  return (
    <div className="privacy-banner" role="dialog" aria-live="polite" aria-label={labels.ariaLabel}>
      <p>
        {labels.textBeforeLink} <a href="./privacy.html">{labels.linkLabel}</a>
        {labels.textAfterLink}
      </p>
      <button type="button" onClick={handleAccept}>
        {labels.accept}
      </button>
    </div>
  )
}

export default PrivacyBanner
