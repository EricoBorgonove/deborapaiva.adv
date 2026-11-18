import { useEffect, useState } from 'react'

const defaultLabels = {
  title: 'Antes de continuar',
  description: 'Informe seu Nome e Assunto para agilizar o seu atendimento.',
  nameLabel: 'Nome',
  namePlaceholder: 'Seu nome',
  subjectLabel: 'Assunto (opcional)',
  subjectPlaceholder: 'Ex.: Consulta de família',
  cancel: 'Cancelar',
  continue: 'Continuar no WhatsApp',
}

function WhatsAppModal({ isOpen, onClose, onSubmit, labels = defaultLabels }) {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()
    const cleanSubject = subject.trim()
    if (!cleanName) return
    onSubmit({ name: cleanName, subject: cleanSubject })
  }

  return (
    <div
      className="whatsapp-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      onClick={onClose}
    >
      <div className="whatsapp-modal" onClick={(event) => event.stopPropagation()}>
        <h2 id="whatsapp-modal-title">{labels.title}</h2>
        <p>{labels.description}</p>

        <form className="whatsapp-modal-form" onSubmit={handleSubmit}>
          <label className="whatsapp-field">
            <span>{labels.nameLabel}</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={labels.namePlaceholder}
              autoComplete="name"
              required
            />
          </label>

          <label className="whatsapp-field">
            <span>{labels.subjectLabel}</span>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder={labels.subjectPlaceholder}
              autoComplete="off"
            />
          </label>

          <div className="whatsapp-actions">
            <button type="button" className="button button-ghost whatsapp-cancel" onClick={onClose}>
              {labels.cancel}
            </button>
            <button type="submit" className="button whatsapp-submit">
              {labels.continue}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WhatsAppModal
