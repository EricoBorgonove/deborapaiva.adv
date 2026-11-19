import { useSyncExternalStore } from 'react'
import { getInitialLanguage, saveLanguage } from './i18n.js'

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('languagechange', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('languagechange', callback)
  }
}

function selectLanguage(language) {
  saveLanguage(language)
  window.dispatchEvent(new Event('languagechange'))
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getInitialLanguage, () => 'pt')
  return [language, selectLanguage]
}
