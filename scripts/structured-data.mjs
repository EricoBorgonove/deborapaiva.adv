import { business } from '../src/business.js'

export function structuredData(origin) {
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
        image: new URL('/assets/debora-sobre.jpeg', url).href,
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
        inLanguage: 'pt-BR',
        publisher: { '@id': `${url}#escritorio` },
      },
    ],
  }
}
