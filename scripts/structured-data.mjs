import { business } from '../src/business.js'
import { languages, localeTags, pagePath } from '../src/siteRoutes.js'

export function structuredData(origin, language, file, portraitUrl) {
  const url = new URL('/', origin).href
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${url}#escritorio`,
        name: business.name,
        url,
        telephone: `+${business.whatsappNumber}`,
        email: business.email,
        image: new URL(portraitUrl, url).href,
        areaServed: { '@type': 'City', name: business.city },
        description: 'Advocacia em Direito de Família e Direito Civil em Manaus. Atendimento somente com hora marcada.',
        sameAs: [business.instagramUrl],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${business.whatsappNumber}`,
          contactType: 'Agendamento de consulta',
          availableLanguage: 'pt-BR',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: business.name,
        inLanguage: languages.map((code) => localeTags[code]),
        publisher: { '@id': `${url}#escritorio` },
      },
      {
        '@type': 'WebPage',
        '@id': new URL(pagePath(language, file), url).href,
        url: new URL(pagePath(language, file), url).href,
        inLanguage: localeTags[language],
        isPartOf: { '@id': `${url}#website` },
      },
    ],
  }
}
