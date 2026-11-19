import { useState } from 'react'

const CONSENT_KEY = 'debora_privacy_consent'

const defaultLabels = {
  ariaLabel: 'Aviso de privacidade',
  textBeforeLink:
    'Este site armazena preferências no seu navegador, como o idioma e a confirmação deste aviso. Não utilizamos cookies de análise ou publicidade. Saiba mais no',
  linkLabel: 'Aviso de Privacidade',
  textAfterLink: '.',
  accept: 'Entendi',
}

function PrivacyBanner({ labels = defaultLabels }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(CONSENT_KEY) !== 'accepted'
  })

  function handleAccept() {
    window.localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
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
