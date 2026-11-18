export const LANGUAGE_KEY = 'debora_site_language'

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es', 'fr']

export function resolveLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : 'pt'
}

export function getInitialLanguage() {
  if (typeof window === 'undefined') return 'pt'

  const saved = window.localStorage.getItem(LANGUAGE_KEY)
  if (SUPPORTED_LANGUAGES.includes(saved)) return saved

  const browserLanguage = window.navigator.language?.toLowerCase() ?? ''
  if (browserLanguage.startsWith('fr')) return 'fr'
  if (browserLanguage.startsWith('es')) return 'es'
  if (browserLanguage.startsWith('en')) return 'en'

  return 'pt'
}

export function saveLanguage(language) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LANGUAGE_KEY, resolveLanguage(language))
}

export function buildWhatsAppMessage(language, { name, subject }) {
  const cleanLanguage = resolveLanguage(language)
  const cleanSubject = subject?.trim()

  if (cleanLanguage === 'es') {
    const subjectLine = cleanSubject ? ` Asunto: ${cleanSubject}.` : ''
    return `Hola, mi nombre es ${name}.${subjectLine} Quiero agendar una consulta jurídica.`
  }

  if (cleanLanguage === 'fr') {
    const subjectLine = cleanSubject ? ` Sujet : ${cleanSubject}.` : ''
    return `Bonjour, je m'appelle ${name}.${subjectLine} Je souhaite prendre un rendez-vous pour une consultation juridique.`
  }

  if (cleanLanguage === 'en') {
    const subjectLine = cleanSubject ? ` Subject: ${cleanSubject}.` : ''
    return `Hello, my name is ${name}.${subjectLine} I would like to schedule a legal consultation.`
  }

  const subjectLine = cleanSubject ? ` Assunto: ${cleanSubject}.` : ''
  return `Olá, meu nome é ${name}.${subjectLine} Quero agendar uma consulta jurídica.`
}

export const translations = {
  pt: {
    common: {
      brandAlt: 'Débora Paiva Advocacia',
      nav: {
        openMenuAria: 'Abrir menu',
        collapseAria: 'Recolher navegação',
        expandAria: 'Expandir navegação',
        mainAria: 'Navegação principal',
        homeAria: 'Início',
        about: 'Sobre mim',
        practice: 'Atuação',
        method: 'Método',
        blog: 'Blog',
        enter: 'Entrar',
        contact: 'Entre em contato',
        backToSite: 'Voltar ao site',
        privacyShort: 'Aviso',
        languageAria: 'Selecionar idioma',
      },
      footer: {
        developedBy: 'Desenvolvido por borgonove.com',
        rights: 'Todos os direitos reservados.',
        privacy: 'Aviso de Privacidade',
      },
      privacyBanner: {
        ariaLabel: 'Aviso de privacidade',
        textBeforeLink:
          'A Débora Paiva Advocacia usa cookies e tecnologias semelhantes para melhorar sua experiência. Ao continuar, você concorda com esse uso. Leia nosso',
        linkLabel: 'Aviso de Privacidade',
        textAfterLink: '.',
        accept: 'Aceitar',
      },
      whatsappModal: {
        title: 'Antes de continuar',
        description: 'Informe seu Nome e Assunto para agilizar o seu atendimento.',
        nameLabel: 'Nome',
        namePlaceholder: 'Seu nome',
        subjectLabel: 'Assunto (opcional)',
        subjectPlaceholder: 'Ex.: Consulta de família',
        cancel: 'Cancelar',
        continue: 'Continuar no WhatsApp',
      },
    },
    home: {
      navContactAria: 'Abrir contato no WhatsApp',
      heroEyebrow: 'ADVOCACIA ESTRATÉGICA',
      heroTitle: 'Atendimento humanizado e firme na defesa dos seus direitos.',
      heroText: 'Atuação em Direito de Familia e Civil. Atendimento transparente, firme e humanizado e com total confidencialidade.',
      heroPrimaryCta: 'Agendar consulta',
      heroSecondaryCta: 'Conhecer áreas',
      panelEyebrow: 'Atendimento inicial',
      panelTitle: 'Consulta de diagnóstico jurídico',
      panelItems: ['Leitura técnica do seu caso', 'Checklist de documentos', 'Próximos passos com estratégia'],
      aboutEyebrow: 'Sobre mim',
      aboutTitle: 'Sou Débora Paiva, advogada com atuação estratégica e atendimento humanizado.',
      aboutParagraphs: [
        'Minha atuação é focada em Direito de Família e Direito Civil, com olhar técnico e sensível para situações que exigem firmeza, escuta e clareza.',
        'Ao longo da minha trajetória, construí uma prática orientada por responsabilidade, discrição e resultado, sempre buscando soluções jurídicas seguras para cada etapa do seu caso.',
      ],
      aboutTopics: ['Palestrante', 'Professora e Coordenadora de Direito', 'Especialista em Direito de Família'],
      aboutPhotoAlt: 'Retrato profissional de advogada',
      indicators: [
        { value: 5, label: 'anos de experiência' },
        { value: 200, label: 'ações' },
        { value: 1000, label: 'atendimentos' },
      ],
      practiceEyebrow: 'Frentes de atuação',
      practiceTitle: 'Solidez jurídica para conflitos sensíveis e patrimoniais.',
      serviceCards: [
        {
          title: 'Direito de Família',
          items: [
            'Divórcio consensual e litigioso',
            'Guarda, convivência e alimentos',
            'União estável e partilha de bens',
            'Medidas urgentes e protetivas',
          ],
        },
        {
          title: 'Direito Civil',
          items: [
            'Contratos, revisão e negociação',
            'Responsabilidade civil e indenização',
            'Cobrança e execução de títulos',
            'Conflitos patrimoniais e consumo',
          ],
        },
        {
          title: 'Consultoria Preventiva',
          items: [
            'Análise de risco jurídico',
            'Organização documental',
            'Planejamento para acordos seguros',
            'Orientação para tomada de decisão',
          ],
        },
      ],
      statusPhrases: [
        'Atuação personalizada para cada contexto familiar',
        'Negociação qualificada para reduzir desgaste',
        'Rigor técnico do início ao desfecho',
      ],
      methodEyebrow: 'Método de trabalho',
      methodTitle: 'Um processo objetivo para decisões jurídicas seguras.',
      processSteps: [
        {
          number: '01',
          title: 'Escuta e diagnóstico',
          text: 'Levantamento do caso, contexto familiar e documental para identificar riscos reais e oportunidades de solução.',
        },
        {
          number: '02',
          title: 'Estratégia jurídica',
          text: 'Definição de caminho judicial ou extrajudicial com plano de ação claro, prazos e prioridades.',
        },
        {
          number: '03',
          title: 'Atuação técnica',
          text: 'Condução de cada etapa com fundamento jurídico, comunicação objetiva e acompanhamento contínuo.',
        },
        {
          number: '04',
          title: 'Resolução e continuidade',
          text: 'Encerramento com foco em estabilidade jurídica e orientação para prevenir novos conflitos.',
        },
      ],
      faqEyebrow: 'Perguntas frequentes',
      faqTitle: 'Informação clara para você agir com segurança.',
      faqImageAlt: 'Atendimento jurídico',
      faqItems: [
        {
          question: 'Vocês atendem online?',
          answer:
            'Sim. O escritório atende de forma online e presencial, conforme o tipo de demanda e necessidade do cliente.',
        },
        {
          question: 'Quanto tempo leva para iniciar o caso?',
          answer:
            'Após a consulta inicial e organização dos documentos essenciais, a estratégia pode ser iniciada imediatamente.',
        },
        {
          question: 'Posso resolver sem processo judicial?',
          answer:
            'Em muitos casos, sim. A prioridade é buscar uma solução segura e eficiente por negociação quando houver viabilidade jurídica.',
        },
        {
          question: 'Quais documentos devo levar para a primeira consulta?',
          answer:
            'Documentos pessoais e todos os registros relacionados ao caso, como contratos, comprovantes, mensagens e decisões anteriores, quando houver.',
        },
        {
          question: 'Como funciona o acompanhamento do meu processo?',
          answer:
            'Você recebe atualizações em cada etapa relevante, com explicações objetivas sobre próximos passos, prazos e estratégias adotadas.',
        },
        {
          question: 'Atendem casos urgentes?',
          answer:
            'Sim. Demandas com necessidade de medida urgente recebem análise prioritária para definição rápida da melhor medida jurídica.',
        },
      ],
    },
    blog: {
      title: 'Conteúdo jurídico para orientar decisões importantes.',
      subtitle: 'Novos artigos serão publicados em breve.',
      comingSoon: 'Em breve',
      posts: [
        {
          category: 'Direito de Família',
          title: 'Guarda compartilhada: o que muda na prática',
        },
        {
          category: 'Direito Civil',
          title: 'Cláusulas essenciais para contratos mais seguros',
        },
        {
          category: 'Orientação Jurídica',
          title: 'Quando buscar acordo e quando judicializar',
        },
      ],
    },
    privacy: {
      backToHome: 'Voltar para início',
      title: 'Aviso de Privacidade',
      updatedAt: 'Última atualização: 16 de fevereiro de 2026.',
      intro:
        'A Débora Paiva Advocacia, controladora dos dados pessoais tratados neste site, respeita sua privacidade e atua com responsabilidade, transparência e segurança, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).',
      sections: [
        {
          title: '1. Dados Que Podemos Coletar',
          items: [
            'Dados informados por você em formulários, como nome, e-mail e mensagem.',
            'Dados técnicos de navegação, como endereço IP, navegador, dispositivo e páginas acessadas.',
            'Dados de uso gerados por cookies e tecnologias semelhantes.',
          ],
        },
        {
          title: '2. Finalidades Do Tratamento',
          items: [
            'Responder solicitações de contato e prestar suporte.',
            'Melhorar a experiência de navegação, desempenho e segurança do site.',
            'Realizar análises estatísticas de acesso e uso de funcionalidades.',
            'Personalizar conteúdo e comunicações, quando aplicável.',
          ],
        },
        {
          title: '3. Base Legal (LGPD)',
          items: [
            'Execução de procedimentos preliminares e atendimento de solicitações.',
            'Legítimo interesse para melhoria contínua e segurança do serviço.',
            'Consentimento, quando necessário para determinadas tecnologias de rastreio.',
          ],
        },
        {
          title: '4. Compartilhamento De Dados',
          items: [
            'Seus dados podem ser tratados por provedores de hospedagem, e-mail e ferramentas técnicas.',
            'Não comercializamos dados pessoais.',
            'Compartilhamentos ocorrem apenas quando necessários, com controles de segurança.',
          ],
        },
        {
          title: '5. Cookies E Tecnologias Semelhantes',
          items: [
            'Utilizamos cookies para lembrar preferências, medir desempenho e otimizar serviços.',
            'Você pode gerenciar cookies no navegador, ciente de que isso pode afetar funcionalidades.',
            'Ao continuar navegando e aceitar o aviso, você concorda com esse uso nos termos deste aviso.',
          ],
        },
        {
          title: '6. Armazenamento E Segurança',
          items: [
            'Adotamos medidas técnicas e administrativas para proteger dados pessoais.',
            'Os dados são mantidos pelo período necessário ao cumprimento das finalidades descritas.',
            'Quando aplicável, dados podem ser eliminados ou anonimizados ao fim do ciclo de uso.',
          ],
        },
        {
          title: '7. Direitos Do Titular',
          items: [
            'Confirmação e acesso aos dados tratados.',
            'Correção de dados incompletos, inexatos ou desatualizados.',
            'Anonimização, bloqueio ou eliminação quando cabível.',
            'Portabilidade, informação sobre compartilhamento e revogação de consentimento.',
          ],
        },
        {
          title: '8. Contato Para Privacidade',
          items: ['Para solicitações relacionadas à privacidade e LGPD, entre em contato pelo e-mail contato@deborapaiva.adv.br.'],
        },
        {
          title: '9. Atualizações Deste Aviso',
          items: ['Este aviso pode ser atualizado periodicamente para refletir melhorias técnicas, legais ou operacionais.'],
        },
      ],
    },
  },
  en: {
    common: {
      brandAlt: 'Debora Paiva Law Firm',
      nav: {
        openMenuAria: 'Open menu',
        collapseAria: 'Collapse navigation',
        expandAria: 'Expand navigation',
        mainAria: 'Main navigation',
        homeAria: 'Home',
        about: 'About',
        practice: 'Practice',
        method: 'Method',
        blog: 'Blog',
        enter: 'Sign in',
        contact: 'Contact us',
        backToSite: 'Back to site',
        privacyShort: 'Privacy',
        languageAria: 'Select language',
      },
      footer: {
        developedBy: 'Developed by borgonove.com',
        rights: 'All rights reserved.',
        privacy: 'Privacy Notice',
      },
      privacyBanner: {
        ariaLabel: 'Privacy notice',
        textBeforeLink:
          'Debora Paiva Law Firm uses cookies and similar technologies to improve your experience. By continuing, you agree to this use. Read our',
        linkLabel: 'Privacy Notice',
        textAfterLink: '.',
        accept: 'Accept',
      },
      whatsappModal: {
        title: 'Before continuing',
        description: 'Please provide your Name and Subject to speed up your service.',
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        subjectLabel: 'Subject (optional)',
        subjectPlaceholder: 'Ex.: Family consultation',
        cancel: 'Cancel',
        continue: 'Continue on WhatsApp',
      },
    },
    home: {
      navContactAria: 'Open WhatsApp contact',
      heroEyebrow: 'STRATEGIC LEGAL PRACTICE',
      heroTitle: 'Human-centered service and firm defense of your rights.',
      heroText: 'Practice in Family and Civil Law. Transparent, firm and human-centered guidance with total confidentiality.',
      heroPrimaryCta: 'Schedule consultation',
      heroSecondaryCta: 'View practice areas',
      panelEyebrow: 'Initial service',
      panelTitle: 'Legal diagnostic consultation',
      panelItems: ['Technical review of your case', 'Document checklist', 'Next steps with strategy'],
      aboutEyebrow: 'About me',
      aboutTitle: 'I am Debora Paiva, an attorney focused on strategy and human-centered service.',
      aboutParagraphs: [
        'My work is centered on Family Law and Civil Law, with a technical and sensitive approach for situations that require firmness, listening and clarity.',
        'Throughout my career, I have built a practice guided by responsibility, discretion and results, always seeking reliable legal solutions for each stage of your case.',
      ],
      aboutTopics: ['Speaker', 'Law Professor and Coordinator', 'Family Law Specialist'],
      aboutPhotoAlt: 'Professional portrait of attorney',
      indicators: [
        { value: 5, label: 'years of experience' },
        { value: 200, label: 'cases' },
        { value: 1000, label: 'consultations' },
      ],
      practiceEyebrow: 'Practice areas',
      practiceTitle: 'Legal solidity for sensitive and patrimonial disputes.',
      serviceCards: [
        {
          title: 'Family Law',
          items: [
            'Consensual and contested divorce',
            'Custody, visitation and child support',
            'Stable union and asset division',
            'Urgent and protective measures',
          ],
        },
        {
          title: 'Civil Law',
          items: [
            'Contracts, review and negotiation',
            'Civil liability and compensation',
            'Debt collection and enforcement',
            'Patrimonial and consumer disputes',
          ],
        },
        {
          title: 'Preventive Consulting',
          items: [
            'Legal risk analysis',
            'Document organization',
            'Planning for safe agreements',
            'Guidance for decision-making',
          ],
        },
      ],
      statusPhrases: [
        'Tailored strategy for each family context',
        'Qualified negotiation to reduce strain',
        'Technical rigor from start to outcome',
      ],
      methodEyebrow: 'Work method',
      methodTitle: 'An objective process for safe legal decisions.',
      processSteps: [
        {
          number: '01',
          title: 'Listening and assessment',
          text: 'Case, family and document review to identify real risks and opportunities for resolution.',
        },
        {
          number: '02',
          title: 'Legal strategy',
          text: 'Definition of judicial or extrajudicial path with a clear action plan, deadlines and priorities.',
        },
        {
          number: '03',
          title: 'Technical representation',
          text: 'Execution of each stage with legal basis, objective communication and continuous follow-up.',
        },
        {
          number: '04',
          title: 'Resolution and continuity',
          text: 'Closure focused on legal stability and guidance to prevent future conflicts.',
        },
      ],
      faqEyebrow: 'Frequently asked questions',
      faqTitle: 'Clear information so you can act with confidence.',
      faqImageAlt: 'Legal service',
      faqItems: [
        {
          question: 'Do you provide online consultations?',
          answer:
            'Yes. The firm provides both online and in-person consultations, depending on the type of demand and the client needs.',
        },
        {
          question: 'How long does it take to start my case?',
          answer:
            'After the initial consultation and organization of essential documents, strategy can be started immediately.',
        },
        {
          question: 'Can I solve my case without going to court?',
          answer:
            'In many situations, yes. The priority is to seek a safe and efficient negotiated solution whenever legally viable.',
        },
        {
          question: 'Which documents should I bring to the first consultation?',
          answer:
            'Personal documents and all records related to your case, such as contracts, receipts, messages and previous decisions, when applicable.',
        },
        {
          question: 'How does case follow-up work?',
          answer:
            'You receive updates at each relevant stage, with objective explanations about next steps, deadlines and adopted strategies.',
        },
        {
          question: 'Do you handle urgent cases?',
          answer:
            'Yes. Cases requiring urgent measures receive priority analysis for a quick definition of the best legal action.',
        },
      ],
    },
    blog: {
      title: 'Legal content to guide important decisions.',
      subtitle: 'New articles will be published soon.',
      comingSoon: 'Coming soon',
      posts: [
        {
          category: 'Family Law',
          title: 'Shared custody: what changes in practice',
        },
        {
          category: 'Civil Law',
          title: 'Essential clauses for safer contracts',
        },
        {
          category: 'Legal Guidance',
          title: 'When to seek an agreement and when to litigate',
        },
      ],
    },
    privacy: {
      backToHome: 'Back to home',
      title: 'Privacy Notice',
      updatedAt: 'Last updated: February 16, 2026.',
      intro:
        'Debora Paiva Law Firm, the controller of personal data processed on this website, respects your privacy and acts with responsibility, transparency and security, in compliance with Brazil General Data Protection Law (Law No. 13,709/2018 - LGPD).',
      sections: [
        {
          title: '1. Data We May Collect',
          items: [
            'Data provided by you in forms, such as name, email and message.',
            'Technical browsing data, such as IP address, browser, device and accessed pages.',
            'Usage data generated by cookies and similar technologies.',
          ],
        },
        {
          title: '2. Processing Purposes',
          items: [
            'Respond to contact requests and provide support.',
            'Improve website experience, performance and security.',
            'Carry out statistical analysis of access and feature usage.',
            'Personalize content and communications, when applicable.',
          ],
        },
        {
          title: '3. Legal Basis (LGPD)',
          items: [
            'Execution of preliminary procedures and request handling.',
            'Legitimate interest for continuous improvement and service security.',
            'Consent, when required for specific tracking technologies.',
          ],
        },
        {
          title: '4. Data Sharing',
          items: [
            'Your data may be processed by hosting providers, email services and technical tools.',
            'We do not sell personal data.',
            'Sharing occurs only when necessary and with security controls.',
          ],
        },
        {
          title: '5. Cookies and Similar Technologies',
          items: [
            'We use cookies to remember preferences, measure performance and optimize services.',
            'You can manage cookies in your browser, knowing this may affect certain features.',
            'By continuing to browse and accepting the notice, you agree to this use under these terms.',
          ],
        },
        {
          title: '6. Storage and Security',
          items: [
            'We adopt technical and administrative measures to protect personal data.',
            'Data is kept for as long as necessary to fulfill the purposes described.',
            'When applicable, data may be deleted or anonymized at the end of its lifecycle.',
          ],
        },
        {
          title: '7. Data Subject Rights',
          items: [
            'Confirmation and access to processed data.',
            'Correction of incomplete, inaccurate or outdated data.',
            'Anonymization, blocking or deletion, when applicable.',
            'Portability, information on sharing and withdrawal of consent.',
          ],
        },
        {
          title: '8. Privacy Contact',
          items: ['For privacy and LGPD-related requests, contact us at contato@deborapaiva.adv.br.'],
        },
        {
          title: '9. Notice Updates',
          items: ['This notice may be updated periodically to reflect technical, legal or operational improvements.'],
        },
      ],
    },
  },
}

translations.es = {
  ...translations.en,
  common: {
    ...translations.en.common,
    brandAlt: 'Débora Paiva Abogada',
    nav: {
      ...translations.en.common.nav,
      openMenuAria: 'Abrir menú',
      collapseAria: 'Ocultar navegación',
      expandAria: 'Expandir navegación',
      mainAria: 'Navegación principal',
      homeAria: 'Inicio',
      about: 'Sobre mí',
      practice: 'Actuación',
      method: 'Método',
      enter: 'Ingresar',
      contact: 'Contáctame',
      backToSite: 'Volver al sitio',
      privacyShort: 'Privacidad',
      languageAria: 'Seleccionar idioma',
    },
    footer: {
      ...translations.en.common.footer,
      developedBy: 'Desarrollado por borgonove.com',
      rights: 'Todos los derechos reservados.',
      privacy: 'Aviso de Privacidad',
    },
    privacyBanner: {
      ...translations.en.common.privacyBanner,
      ariaLabel: 'Aviso de privacidad',
      textBeforeLink:
        'Débora Paiva Abogada utiliza cookies y tecnologías similares para mejorar tu experiencia. Al continuar, aceptas este uso. Lee nuestro',
      linkLabel: 'Aviso de Privacidad',
      accept: 'Aceptar',
    },
    whatsappModal: {
      ...translations.en.common.whatsappModal,
      title: 'Antes de continuar',
      description: 'Informa tu Nombre y Asunto para agilizar tu atención.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      subjectLabel: 'Asunto (opcional)',
      subjectPlaceholder: 'Ej.: Consulta de familia',
      cancel: 'Cancelar',
      continue: 'Continuar en WhatsApp',
    },
  },
  home: {
    ...translations.en.home,
    navContactAria: 'Abrir contacto en WhatsApp',
    heroEyebrow: 'ABOGACÍA ESTRATÉGICA',
    heroTitle: 'Atención humanizada y firme en la defensa de tus derechos.',
    heroText: 'Actuación en Derecho de Familia y Civil. Atención transparente, firme y humanizada, con total confidencialidad.',
    heroPrimaryCta: 'Agendar consulta',
    heroSecondaryCta: 'Conocer áreas',
    panelEyebrow: 'Atención inicial',
    panelTitle: 'Consulta de diagnóstico jurídico',
    panelItems: ['Lectura técnica de tu caso', 'Checklist de documentos', 'Próximos pasos con estrategia'],
    aboutEyebrow: 'Sobre mí',
    aboutTitle: 'Soy Débora Paiva, abogada con actuación estratégica y atención humanizada.',
    aboutParagraphs: [
      'Mi actuación está enfocada en Derecho de Familia y Derecho Civil, con una mirada técnica y sensible para situaciones que exigen firmeza, escucha y claridad.',
      'A lo largo de mi trayectoria, construí una práctica guiada por responsabilidad, discreción y resultado, buscando siempre soluciones jurídicas seguras para cada etapa de tu caso.',
    ],
    aboutTopics: ['Conferencista', 'Profesora y Coordinadora de Derecho', 'Especialista en Derecho de Familia'],
    aboutPhotoAlt: 'Retrato profesional de abogada',
    indicators: [
      { value: 5, label: 'años de experiencia' },
      { value: 200, label: 'acciones' },
      { value: 1000, label: 'atenciones' },
    ],
    practiceEyebrow: 'Frentes de actuación',
    practiceTitle: 'Solidez jurídica para conflictos sensibles y patrimoniales.',
    serviceCards: [
      {
        title: 'Derecho de Familia',
        items: [
          'Divorcio consensual y contencioso',
          'Custodia, convivencia y alimentos',
          'Unión estable y división de bienes',
          'Medidas urgentes y protectoras',
        ],
      },
      {
        title: 'Derecho Civil',
        items: [
          'Contratos, revisión y negociación',
          'Responsabilidad civil e indemnización',
          'Cobro y ejecución de títulos',
          'Conflictos patrimoniales y consumo',
        ],
      },
      {
        title: 'Consultoría Preventiva',
        items: [
          'Análisis de riesgo jurídico',
          'Organización documental',
          'Planificación para acuerdos seguros',
          'Orientación para la toma de decisiones',
        ],
      },
    ],
    statusPhrases: [
      'Actuación personalizada para cada contexto familiar',
      'Negociación calificada para reducir desgaste',
      'Rigor técnico desde el inicio hasta el cierre',
    ],
    methodEyebrow: 'Método de trabajo',
    methodTitle: 'Un proceso objetivo para decisiones jurídicas seguras.',
    processSteps: [
      {
        number: '01',
        title: 'Escucha y diagnóstico',
        text: 'Levantamiento del caso, contexto familiar y documental para identificar riesgos reales y oportunidades de solución.',
      },
      {
        number: '02',
        title: 'Estrategia jurídica',
        text: 'Definición de vía judicial o extrajudicial con plan de acción claro, plazos y prioridades.',
      },
      {
        number: '03',
        title: 'Actuación técnica',
        text: 'Conducción de cada etapa con fundamento jurídico, comunicación objetiva y seguimiento continuo.',
      },
      {
        number: '04',
        title: 'Resolución y continuidad',
        text: 'Cierre con foco en estabilidad jurídica y orientación para prevenir nuevos conflictos.',
      },
    ],
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Información clara para que actúes con seguridad.',
    faqImageAlt: 'Atención jurídica',
    faqItems: [
      {
        question: '¿Atienden en línea?',
        answer: 'Sí. El despacho atiende de forma online y presencial, según el tipo de demanda y la necesidad del cliente.',
      },
      {
        question: '¿Cuánto tiempo toma iniciar el caso?',
        answer:
          'Después de la consulta inicial y de organizar los documentos esenciales, la estrategia puede iniciarse de inmediato.',
      },
      {
        question: '¿Puedo resolver sin proceso judicial?',
        answer:
          'En muchos casos, sí. La prioridad es buscar una solución segura y eficiente por negociación cuando exista viabilidad jurídica.',
      },
      {
        question: '¿Qué documentos debo llevar a la primera consulta?',
        answer:
          'Documentos personales y todos los registros relacionados al caso, como contratos, comprobantes, mensajes y decisiones anteriores, cuando existan.',
      },
      {
        question: '¿Cómo funciona el seguimiento de mi proceso?',
        answer:
          'Recibirás actualizaciones en cada etapa relevante, con explicaciones objetivas sobre próximos pasos, plazos y estrategias adoptadas.',
      },
      {
        question: '¿Atienden casos urgentes?',
        answer:
          'Sí. Las demandas con necesidad de medida urgente reciben análisis prioritario para definir rápidamente la mejor medida jurídica.',
      },
    ],
  },
  blog: {
    ...translations.en.blog,
    title: 'Contenido jurídico para orientar decisiones importantes.',
    subtitle: 'Nuevos artículos serán publicados pronto.',
    comingSoon: 'Próximamente',
    posts: [
      {
        category: 'Derecho de Familia',
        title: 'Custodia compartida: qué cambia en la práctica',
      },
      {
        category: 'Derecho Civil',
        title: 'Cláusulas esenciales para contratos más seguros',
      },
      {
        category: 'Orientación Jurídica',
        title: 'Cuándo buscar acuerdo y cuándo judicializar',
      },
    ],
  },
  privacy: {
    ...translations.en.privacy,
    backToHome: 'Volver al inicio',
    title: 'Aviso de Privacidad',
    updatedAt: 'Última actualización: 16 de febrero de 2026.',
    intro:
      'Débora Paiva Abogada, responsable del tratamiento de datos personales en este sitio, respeta tu privacidad y actúa con responsabilidad, transparencia y seguridad, de acuerdo con la Ley General de Protección de Datos (Ley nº 13.709/2018 - LGPD).',
    sections: [
      {
        title: '1. Datos Que Podemos Recopilar',
        items: [
          'Datos informados por ti en formularios, como nombre, correo y mensaje.',
          'Datos técnicos de navegación, como dirección IP, navegador, dispositivo y páginas visitadas.',
          'Datos de uso generados por cookies y tecnologías similares.',
        ],
      },
      {
        title: '2. Finalidades del Tratamiento',
        items: [
          'Responder solicitudes de contacto y prestar soporte.',
          'Mejorar la experiencia de navegación, desempeño y seguridad del sitio.',
          'Realizar análisis estadísticos de acceso y uso de funcionalidades.',
          'Personalizar contenidos y comunicaciones, cuando corresponda.',
        ],
      },
      {
        title: '3. Base Legal (LGPD)',
        items: [
          'Ejecución de procedimientos preliminares y atención de solicitudes.',
          'Interés legítimo para mejora continua y seguridad del servicio.',
          'Consentimiento, cuando sea necesario para determinadas tecnologías de rastreo.',
        ],
      },
      {
        title: '4. Compartición de Datos',
        items: [
          'Tus datos pueden ser tratados por proveedores de hosting, correo y herramientas técnicas.',
          'No comercializamos datos personales.',
          'La compartición ocurre solo cuando es necesaria y con controles de seguridad.',
        ],
      },
      {
        title: '5. Cookies y Tecnologías Similares',
        items: [
          'Usamos cookies para recordar preferencias, medir desempeño y optimizar servicios.',
          'Puedes gestionar cookies en tu navegador, sabiendo que esto puede afectar funcionalidades.',
          'Al continuar navegando y aceptar el aviso, aceptas este uso conforme a estos términos.',
        ],
      },
      {
        title: '6. Almacenamiento y Seguridad',
        items: [
          'Adoptamos medidas técnicas y administrativas para proteger datos personales.',
          'Los datos se conservan durante el período necesario para cumplir las finalidades descritas.',
          'Cuando corresponda, los datos pueden eliminarse o anonimizarse al final del ciclo de uso.',
        ],
      },
      {
        title: '7. Derechos del Titular',
        items: [
          'Confirmación y acceso a los datos tratados.',
          'Corrección de datos incompletos, inexactos o desactualizados.',
          'Anonimización, bloqueo o eliminación cuando corresponda.',
          'Portabilidad, información sobre compartición y revocación del consentimiento.',
        ],
      },
      {
        title: '8. Contacto para Privacidad',
        items: ['Para solicitudes relacionadas con privacidad y LGPD, contáctanos en contato@deborapaiva.adv.br.'],
      },
      {
        title: '9. Actualizaciones de Este Aviso',
        items: ['Este aviso puede actualizarse periódicamente para reflejar mejoras técnicas, legales u operativas.'],
      },
    ],
  },
}

translations.fr = {
  ...translations.en,
  common: {
    ...translations.en.common,
    brandAlt: 'Cabinet Debora Paiva',
    nav: {
      ...translations.en.common.nav,
      openMenuAria: 'Ouvrir le menu',
      collapseAria: 'Réduire la navigation',
      expandAria: 'Développer la navigation',
      mainAria: 'Navigation principale',
      homeAria: 'Accueil',
      about: 'À propos',
      practice: 'Domaines',
      method: 'Méthode',
      enter: 'Connexion',
      contact: 'Nous contacter',
      backToSite: 'Retour au site',
      privacyShort: 'Confidentialité',
      languageAria: 'Choisir la langue',
    },
    footer: {
      ...translations.en.common.footer,
      developedBy: 'Développé par borgonove.com',
      rights: 'Tous droits réservés.',
      privacy: 'Avis de confidentialité',
    },
    privacyBanner: {
      ...translations.en.common.privacyBanner,
      ariaLabel: 'Avis de confidentialité',
      textBeforeLink:
        "Le cabinet Debora Paiva utilise des cookies et des technologies similaires pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez cette utilisation. Consultez notre",
      linkLabel: 'Avis de confidentialité',
      accept: 'Accepter',
    },
    whatsappModal: {
      ...translations.en.common.whatsappModal,
      title: 'Avant de continuer',
      description: 'Veuillez indiquer votre nom et le sujet afin de faciliter votre prise en charge.',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom',
      subjectLabel: 'Sujet (optionnel)',
      subjectPlaceholder: 'Ex. : Consultation familiale',
      cancel: 'Annuler',
      continue: 'Continuer sur WhatsApp',
    },
  },
  home: {
    ...translations.en.home,
    navContactAria: 'Ouvrir le contact WhatsApp',
    heroEyebrow: 'PRATIQUE JURIDIQUE STRATÉGIQUE',
    heroTitle: 'Un accompagnement humain et ferme dans la défense de vos droits.',
    heroText:
      'Intervention en droit de la famille et en droit civil. Un accompagnement transparent, ferme et humain, avec une confidentialité totale.',
    heroPrimaryCta: 'Prendre rendez-vous',
    heroSecondaryCta: 'Découvrir les domaines',
    panelEyebrow: 'Premier contact',
    panelTitle: 'Consultation de diagnostic juridique',
    panelItems: ['Analyse technique de votre dossier', 'Checklist des documents', 'Prochaines étapes avec stratégie'],
    aboutEyebrow: 'À propos',
    aboutTitle: 'Je suis Debora Paiva, avocate à l’approche stratégique et à l’accompagnement humain.',
    aboutParagraphs: [
      'Mon activité est centrée sur le droit de la famille et le droit civil, avec un regard technique et sensible sur des situations qui exigent fermeté, écoute et clarté.',
      'Tout au long de mon parcours, j’ai construit une pratique guidée par la responsabilité, la discrétion et les résultats, en recherchant toujours des solutions juridiques sûres à chaque étape de votre dossier.',
    ],
    aboutTopics: ['Conférencière', 'Professeure et coordinatrice en droit', 'Spécialiste en droit de la famille'],
    aboutPhotoAlt: 'Portrait professionnel d’avocate',
    indicators: [
      { value: 5, label: "ans d'expérience" },
      { value: 200, label: 'actions' },
      { value: 1000, label: 'accompagnements' },
    ],
    practiceEyebrow: "Domaines d'intervention",
    practiceTitle: 'Une base juridique solide pour les conflits sensibles et patrimoniaux.',
    serviceCards: [
      {
        title: 'Droit de la famille',
        items: [
          'Divorce amiable et contentieux',
          'Garde, droit de visite et pension alimentaire',
          'Union stable et partage des biens',
          'Mesures urgentes et de protection',
        ],
      },
      {
        title: 'Droit civil',
        items: [
          'Contrats, révision et négociation',
          'Responsabilité civile et indemnisation',
          'Recouvrement et exécution de titres',
          'Litiges patrimoniaux et de consommation',
        ],
      },
      {
        title: 'Conseil préventif',
        items: [
          'Analyse des risques juridiques',
          'Organisation documentaire',
          'Planification pour des accords sûrs',
          'Orientation pour la prise de décision',
        ],
      },
    ],
    statusPhrases: [
      'Une intervention adaptée à chaque contexte familial',
      'Une négociation qualifiée pour réduire l’usure émotionnelle',
      'Une rigueur technique du début à la résolution',
    ],
    methodEyebrow: 'Méthode de travail',
    methodTitle: 'Un processus objectif pour des décisions juridiques sûres.',
    processSteps: [
      {
        number: '01',
        title: 'Écoute et diagnostic',
        text: 'Analyse du dossier, du contexte familial et des documents afin d’identifier les risques réels et les possibilités de résolution.',
      },
      {
        number: '02',
        title: 'Stratégie juridique',
        text: 'Définition d’une voie judiciaire ou extrajudiciaire avec un plan d’action clair, des délais et des priorités.',
      },
      {
        number: '03',
        title: 'Intervention technique',
        text: 'Conduite de chaque étape avec fondement juridique, communication objective et suivi continu.',
      },
      {
        number: '04',
        title: 'Résolution et continuité',
        text: 'Clôture axée sur la stabilité juridique et l’orientation pour prévenir de nouveaux conflits.',
      },
    ],
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Des informations claires pour agir en toute sécurité.',
    faqImageAlt: 'Accompagnement juridique',
    faqItems: [
      {
        question: 'Proposez-vous des consultations en ligne ?',
        answer:
          'Oui. Le cabinet propose des consultations en ligne et en présentiel, selon le type de demande et les besoins du client.',
      },
      {
        question: 'Combien de temps faut-il pour commencer le dossier ?',
        answer:
          'Après la consultation initiale et l’organisation des documents essentiels, la stratégie peut être engagée immédiatement.',
      },
      {
        question: 'Puis-je résoudre ma situation sans procédure judiciaire ?',
        answer:
          'Dans de nombreux cas, oui. La priorité est de rechercher une solution sûre et efficace par la négociation lorsqu’elle est juridiquement viable.',
      },
      {
        question: 'Quels documents dois-je apporter au premier rendez-vous ?',
        answer:
          'Vos documents personnels ainsi que tous les éléments liés à votre dossier, comme les contrats, justificatifs, messages et décisions antérieures, le cas échéant.',
      },
      {
        question: 'Comment se déroule le suivi de mon dossier ?',
        answer:
          'Vous recevez des mises à jour à chaque étape importante, avec des explications objectives sur les prochaines actions, les délais et les stratégies adoptées.',
      },
      {
        question: 'Traitez-vous les dossiers urgents ?',
        answer:
          'Oui. Les demandes nécessitant une mesure urgente font l’objet d’une analyse prioritaire afin de définir rapidement la meilleure réponse juridique.',
      },
    ],
  },
  blog: {
    ...translations.en.blog,
    title: 'Du contenu juridique pour éclairer des décisions importantes.',
    subtitle: 'De nouveaux articles seront publiés prochainement.',
    comingSoon: 'Bientôt',
    posts: [
      {
        category: 'Droit de la famille',
        title: 'Garde partagée : ce qui change en pratique',
      },
      {
        category: 'Droit civil',
        title: 'Clauses essentielles pour des contrats plus sûrs',
      },
      {
        category: 'Orientation juridique',
        title: 'Quand rechercher un accord et quand engager une action judiciaire',
      },
    ],
  },
  privacy: {
    ...translations.en.privacy,
    backToHome: "Retour à l'accueil",
    title: 'Avis de confidentialité',
    updatedAt: 'Dernière mise à jour : 16 février 2026.',
    intro:
      'Le cabinet Debora Paiva, responsable du traitement des données personnelles sur ce site, respecte votre vie privée et agit avec responsabilité, transparence et sécurité, conformément à la Loi générale brésilienne sur la protection des données (Loi n° 13.709/2018 - LGPD).',
    sections: [
      {
        title: '1. Données Que Nous Pouvons Collecter',
        items: [
          'Les données fournies par vous dans les formulaires, telles que le nom, l’e-mail et le message.',
          'Les données techniques de navigation, telles que l’adresse IP, le navigateur, l’appareil et les pages consultées.',
          'Les données d’utilisation générées par les cookies et technologies similaires.',
        ],
      },
      {
        title: '2. Finalités Du Traitement',
        items: [
          'Répondre aux demandes de contact et fournir une assistance.',
          'Améliorer l’expérience de navigation, la performance et la sécurité du site.',
          'Réaliser des analyses statistiques de l’accès et de l’utilisation des fonctionnalités.',
          'Personnaliser les contenus et communications, lorsque cela s’applique.',
        ],
      },
      {
        title: '3. Base Légale (LGPD)',
        items: [
          'Exécution de démarches préliminaires et traitement des demandes.',
          'Intérêt légitime pour l’amélioration continue et la sécurité du service.',
          'Consentement, lorsque cela est nécessaire pour certaines technologies de suivi.',
        ],
      },
      {
        title: '4. Partage Des Données',
        items: [
          'Vos données peuvent être traitées par des prestataires d’hébergement, d’e-mail et d’outils techniques.',
          'Nous ne commercialisons pas les données personnelles.',
          'Le partage n’a lieu que lorsque cela est nécessaire et avec des mesures de sécurité adaptées.',
        ],
      },
      {
        title: '5. Cookies Et Technologies Similaires',
        items: [
          'Nous utilisons des cookies pour mémoriser les préférences, mesurer les performances et optimiser les services.',
          'Vous pouvez gérer les cookies dans votre navigateur, en sachant que cela peut affecter certaines fonctionnalités.',
          'En poursuivant votre navigation et en acceptant l’avis, vous acceptez cette utilisation dans les conditions prévues par le présent avis.',
        ],
      },
      {
        title: '6. Conservation Et Sécurité',
        items: [
          'Nous adoptons des mesures techniques et administratives pour protéger les données personnelles.',
          'Les données sont conservées pendant la durée nécessaire à la réalisation des finalités décrites.',
          'Lorsque cela s’applique, les données peuvent être supprimées ou anonymisées à la fin de leur cycle d’utilisation.',
        ],
      },
      {
        title: '7. Droits De La Personne Concernée',
        items: [
          'Confirmation et accès aux données traitées.',
          'Correction des données incomplètes, inexactes ou obsolètes.',
          'Anonymisation, blocage ou suppression, lorsque cela est applicable.',
          'Portabilité, information sur le partage et retrait du consentement.',
        ],
      },
      {
        title: '8. Contact Pour La Confidentialité',
        items: ['Pour toute demande relative à la confidentialité et à la LGPD, contactez-nous à contato@deborapaiva.adv.br.'],
      },
      {
        title: '9. Mises À Jour De Cet Avis',
        items: ['Cet avis peut être mis à jour périodiquement pour refléter des améliorations techniques, juridiques ou opérationnelles.'],
      },
    ],
  },
}
