export const languages = ['pt', 'en', 'es', 'fr']
export const pageFiles = ['index.html', 'blog.html', 'privacy.html']
export const localeTags = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr' }
export const ogLocales = { pt: 'pt_BR', en: 'en_US', es: 'es_ES', fr: 'fr_FR' }

export function pagePath(language, file = 'index.html') {
  const prefix = language === 'pt' ? '/' : `/${language}/`
  return file === 'index.html' ? prefix : `${prefix}${file}`
}

export function outputFile(language, file) {
  return language === 'pt' ? file : `${language}/${file}`
}

export const localTitles = {
  pt: 'Advogada de Família em Manaus | Débora Paiva',
  en: 'Family Lawyer in Manaus | Débora Paiva',
  es: 'Abogada de Familia en Manaus | Débora Paiva',
  fr: 'Avocate en droit de la famille à Manaus | Débora Paiva',
}

export function locationLabel(language) {
  return {
    pt: 'Manaus - AM — atendimento somente com hora marcada',
    en: 'Manaus - AM — consultations by appointment only',
    es: 'Manaus - AM — atención solo con cita previa',
    fr: 'Manaus - AM — consultations uniquement sur rendez-vous',
  }[language]
}
