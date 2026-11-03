/**
 * Textos PT-PT. Os factos (contactos, horário, listas de serviços/produtos) vêm de src/data/clinic.ts;
 * aqui fica a redação. Conteúdo marcado como editorial é proposta da PIXART, a validar pela clínica.
 */
export const pt = {
  meta: {
    siteName: 'Centro Veterinário Arca de Noé',
    demoLabel: 'Proposta de redesign — PIXART',
    demoNote: 'Demonstração não oficial',
    pages: {
      home: {
        title: 'Centro Veterinário Arca de Noé — Veterinário em São Bartolomeu de Messines',
        description:
          'Clínica veterinária em São Bartolomeu de Messines, Silves. Check-ups, vacinação, análises, RX, ecografia, cirurgia, internamento, banhos e tosquias. Consultas por marcação.',
      },
      clinic: {
        title: 'A Clínica — Centro Veterinário Arca de Noé',
        description:
          'Conheça o Centro Veterinário Arca de Noé, em São Bartolomeu de Messines: cuidados veterinários de proximidade, com consultas por marcação.',
      },
      services: {
        title: 'Serviços veterinários — Centro Veterinário Arca de Noé',
        description:
          'Prevenção, exames de diagnóstico, cirurgia, internamento, banhos e tosquias em São Bartolomeu de Messines. Peça a sua consulta.',
      },
      products: {
        title: 'Produtos para animais — Centro Veterinário Arca de Noé',
        description:
          'Rações, guloseimas, vitaminas, higiene, medicamentos, acessórios, brinquedos e camas no espaço da clínica, em São Bartolomeu de Messines.',
      },
      contact: {
        title: 'Contactos e pedido de consulta — Centro Veterinário Arca de Noé',
        description:
          'Telefone, telemóvel, email, morada e horário do Centro Veterinário Arca de Noé, em São Bartolomeu de Messines. Peça uma consulta.',
      },
      privacy: {
        title: 'Privacidade e cookies — Centro Veterinário Arca de Noé',
        description: 'Informação sobre o tratamento de dados pessoais e utilização de cookies neste website (rascunho).',
      },
    },
  },
  a11y: {
    skip: 'Saltar para o conteúdo',
    mainNav: 'Navegação principal',
    footerNav: 'Navegação do rodapé',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    quickActions: 'Ações rápidas',
    home: 'Página inicial',
    opensExternal: '(abre noutro separador)',
  },
  nav: {
    home: 'Início',
    clinic: 'A Clínica',
    services: 'Serviços',
    products: 'Produtos',
    contact: 'Contactos',
    privacy: 'Privacidade e cookies',
  },
  cta: {
    book: 'Pedir consulta',
    call: 'Ligar',
    callClinic: 'Ligar para a clínica',
    services: 'Conhecer os serviços',
    allServices: 'Ver todos os serviços',
    directions: 'Obter direções',
    availability: 'Consultar disponibilidade',
    products: 'Ver produtos',
    clinic: 'Conhecer a clínica',
    sendEmail: 'Enviar email',
  },
  common: {
    byAppointment: 'Consultas por marcação',
    phone: 'Telefone',
    mobile: 'Telemóvel',
    email: 'Email',
    address: 'Morada',
    hours: 'Horário',
    fullHours: 'Horário completo',
    closed: 'Encerrado',
    and: 'e',
    days: { weekdays: 'Segunda a sexta', saturday: 'Sábado', sunday: 'Domingo' },
    daysShort: { weekdays: 'Seg–Sex', saturday: 'Sáb', sunday: 'Dom' },
    urgent:
      'Precisa de assistência urgente? Contacte a clínica por telefone para confirmar a disponibilidade de atendimento.',
    urgentTitle: 'Situação urgente',
    urgentFormNote: 'Este formulário não deve ser usado em situações urgentes.',
  },
  services: {
    groups: {
      prevencao: {
        title: 'Prevenção',
        lead: 'Acompanhamento regular para ajudar a manter o seu animal saudável ao longo da vida.',
        body: 'Consultas de rotina, plano de vacinação e desparasitação. O calendário mais adequado é definido em consulta, de acordo com a idade, o estilo de vida e o historial do animal.',
      },
      diagnostico: {
        title: 'Exames de diagnóstico',
        lead: 'Exames complementares para apoiar a avaliação clínica.',
        body: 'Quando o médico veterinário considera necessário, a clínica dispõe de análises, radiografia, ecografia e eletrocardiografia. A indicação de cada exame é sempre feita caso a caso.',
      },
      cirurgia: {
        title: 'Cirurgia e internamento',
        lead: 'Procedimentos cirúrgicos e acompanhamento quando o animal precisa de ficar na clínica.',
        body: 'A necessidade de cirurgia ou de internamento é avaliada em consulta. A equipa explica o procedimento, os cuidados antes e depois e esclarece as suas dúvidas.',
      },
      higiene: {
        title: 'Higiene e bem-estar',
        lead: 'Banhos e tosquias para o conforto do dia a dia.',
        body: 'Cuidados de higiene e manutenção da pelagem, com marcação prévia. Pergunte à clínica qual o serviço indicado para o seu animal.',
      },
    },
    items: {
      checkups: 'Check-ups',
      vacinacoes: 'Vacinação',
      desparasitacoes: 'Desparasitação',
      analises: 'Análises',
      radiografia: 'Radiografia (RX)',
      ecografia: 'Ecografia',
      eletrocardiografia: 'Eletrocardiografia',
      cirurgia: 'Cirurgia',
      internamento: 'Internamento',
      banhos: 'Banhos',
      tosquias: 'Tosquias',
    } as Record<string, string>,
    bookThis: 'Pedir consulta para',
  },
  products: {
    items: {
      racoes: { title: 'Rações', text: 'Alimentação para o dia a dia do seu animal.' },
      guloseimas: { title: 'Guloseimas', text: 'Pequenos snacks para recompensas e treino.' },
      vitaminas: { title: 'Vitaminas', text: 'Suplementos, a usar com aconselhamento da clínica.' },
      higiene: { title: 'Produtos de higiene', text: 'Para os cuidados de limpeza em casa.' },
      medicamentos: { title: 'Medicamentos', text: 'Disponíveis mediante indicação do médico veterinário.' },
      acessorios: { title: 'Acessórios', text: 'Artigos práticos para passeios e rotina.' },
      brinquedos: { title: 'Brinquedos', text: 'Para brincar, gastar energia e estimular.' },
      camas: { title: 'Camas', text: 'Um lugar confortável para descansar.' },
    },
    note: 'A disponibilidade de cada produto pode variar. Contacte a clínica antes de se deslocar.',
  },
  home: {
    eyebrow: 'Veterinário em São Bartolomeu de Messines',
    title: 'O bem-estar do seu animal começa com um cuidado próximo.',
    lead: 'Prevenção, exames de diagnóstico, cirurgia, internamento e higiene, num só lugar. Uma clínica local para acompanhar o seu animal em cada fase da vida.',
    heroNote: 'As consultas são feitas por marcação.',
    facts: {
      where: { label: 'Onde estamos', value: 'São Bartolomeu de Messines, Silves' },
      how: { label: 'Como funciona', value: 'Consultas por marcação' },
      when: { label: 'Horário', value: 'Seg–Sex 10:00–13:30 · 16:30–19:30', link: 'Ver horário completo' },
    },
    servicesEyebrow: 'Serviços',
    servicesTitle: 'Cuidados organizados pelo que o seu animal precisa',
    servicesLead: 'Da consulta de rotina ao exame de diagnóstico, encontre o tipo de cuidado de que precisa.',
    clinicEyebrow: 'A clínica',
    clinicTitle: 'Uma clínica de proximidade, no centro de Messines',
    clinicText: [
      'O Centro Veterinário Arca de Noé acompanha animais de companhia e as suas famílias em São Bartolomeu de Messines, no concelho de Silves.',
      'Reunimos no mesmo espaço a consulta, os exames complementares, a cirurgia, o internamento e os cuidados de higiene, para que cada visita seja simples e bem acompanhada.',
    ],
    stepsEyebrow: 'Marcação',
    stepsTitle: 'Pedir uma consulta é simples',
    steps: [
      { title: 'Escolha o motivo', text: 'Prevenção, exames, cirurgia, higiene ou outro assunto.' },
      { title: 'Ligue ou envie um pedido', text: 'Por telefone, dentro do horário, ou através do formulário de pedido.' },
      { title: 'Aguarde a confirmação', text: 'A clínica confirma o dia e a hora. A data que indicar no pedido é apenas uma preferência e não fica reservada automaticamente.' },
    ],
    productsEyebrow: 'Produtos',
    productsTitle: 'Tudo o que precisa, no espaço da clínica',
    productsLead: 'Para além dos cuidados veterinários, encontra na clínica produtos para a alimentação, a higiene e o conforto do seu animal.',
    faqEyebrow: 'Perguntas frequentes',
    faqTitle: 'Antes da sua visita',
    contactEyebrow: 'Contactos',
    contactTitle: 'Estamos em São Bartolomeu de Messines',
    contactLead: 'Ligue para a clínica ou envie o seu pedido de consulta. Confirmamos consigo o melhor dia e hora.',
  },
  faq: [
    {
      q: 'Preciso de marcar a consulta?',
      a: 'Sim. As consultas são feitas por marcação. Pode ligar para a clínica dentro do horário de atendimento ou enviar um pedido de consulta; a clínica contacta-o para confirmar o dia e a hora.',
    },
    {
      q: 'Onde fica a clínica?',
      a: 'Na Rua Senhora Saúde, Lote 2, r/c D, 8375-138 São Bartolomeu de Messines, no concelho de Silves. Na página de contactos encontra o botão para obter direções.',
    },
    {
      q: 'Qual é o horário?',
      a: 'De segunda a sexta, das 10:00 às 13:30 e das 16:30 às 19:30. Ao sábado, das 10:00 às 13:30. Ao domingo a clínica está encerrada. Em feriados, confirme o horário por telefone.',
    },
    {
      q: 'Que serviços estão disponíveis?',
      a: 'Check-ups, vacinação, desparasitação, análises, radiografia (RX), ecografia, eletrocardiografia, cirurgia, internamento, banhos e tosquias. Se tiver dúvidas sobre o serviço indicado, fale com a clínica.',
    },
    {
      q: 'O que faço numa situação urgente?',
      a: 'Contacte a clínica por telefone para confirmar a disponibilidade de atendimento. Não use o formulário de pedido de consulta em situações urgentes, porque os pedidos não são lidos em tempo real.',
    },
  ],
  clinicPage: {
    eyebrow: 'A Clínica',
    title: 'Cuidado próximo. Confiança em cada visita.',
    lead: 'Um centro veterinário local, em São Bartolomeu de Messines, para acompanhar o seu animal da prevenção ao tratamento.',
    sections: [
      {
        title: 'O que nos orienta',
        text: 'Queremos que cada tutor saia da clínica a perceber o que se passa com o seu animal e quais são os próximos passos. Explicamos com clareza, respondemos às perguntas e decidimos em conjunto.',
      },
      {
        title: 'Tudo num só lugar',
        text: 'Consulta, exames complementares, cirurgia, internamento, banhos e tosquias no mesmo espaço. Menos deslocações e um acompanhamento mais contínuo.',
      },
      {
        title: 'Perto de si',
        text: 'Estamos em São Bartolomeu de Messines, no concelho de Silves. As consultas são por marcação, para que cada animal tenha o tempo de que precisa.',
      },
    ],
    valuesTitle: 'Como trabalhamos',
    values: [
      { title: 'Prevenção primeiro', text: 'Check-ups, vacinação e desparasitação ajudam a antecipar problemas.' },
      { title: 'Informação clara', text: 'Cada exame ou procedimento é explicado antes de ser feito.' },
      { title: 'Respeito pelo animal', text: 'Um ambiente calmo e um manuseamento cuidadoso em cada visita.' },
    ],
    visitTitle: 'Visite-nos',
    visitText: 'Marque a sua consulta por telefone ou envie um pedido. Confirmamos consigo o dia e a hora.',
  },
  servicesPage: {
    eyebrow: 'Serviços',
    title: 'Cuidados veterinários para cada fase da vida',
    lead: 'Organizámos os serviços da clínica por tipo de cuidado. Em caso de dúvida, ligue-nos: ajudamos a perceber qual o mais indicado.',
    includes: 'Inclui',
    closingTitle: 'Não sabe qual o serviço de que precisa?',
    closingText: 'Escolha «Outro assunto» no pedido de consulta ou ligue para a clínica. Explicamos as opções.',
  },
  productsPage: {
    eyebrow: 'Produtos',
    title: 'Produtos para o dia a dia do seu animal',
    lead: 'No espaço da clínica encontra produtos de alimentação, higiene e conforto. Peça aconselhamento sobre o que é mais adequado ao seu animal.',
    groups: [
      { title: 'Alimentação', items: ['racoes', 'guloseimas', 'vitaminas'] },
      { title: 'Saúde e higiene', items: ['higiene', 'medicamentos'] },
      { title: 'Conforto e diversão', items: ['acessorios', 'brinquedos', 'camas'] },
    ],
    adviceTitle: 'Aconselhamento na clínica',
    adviceText: 'Os medicamentos são disponibilizados mediante indicação do médico veterinário. Para outros produtos, a equipa ajuda a escolher.',
    availabilityTitle: 'Procura um produto em particular?',
    availabilityText: 'A disponibilidade pode variar. Contacte a clínica para confirmar antes de se deslocar.',
  },
  contactPage: {
    eyebrow: 'Contactos',
    title: 'Contactos e pedido de consulta',
    lead: 'Ligue para a clínica dentro do horário ou envie um pedido. A clínica contacta-o para confirmar o dia e a hora.',
    directionsTitle: 'Como chegar',
    directionsText: 'A clínica fica em São Bartolomeu de Messines, concelho de Silves.',
    directionsNote: 'Abre o Google Maps num novo separador.',
    holidaysNote: 'Em feriados, confirme o horário por telefone.',
    formTitle: 'Pedido de consulta',
    formLead: 'Preencha os dados essenciais. Não é necessário enviar informação clínica detalhada.',
  },
  form: {
    demoBanner: 'Demonstração — este formulário não envia pedidos.',
    demoExplain: 'Nesta proposta, os dados ficam apenas no seu navegador. Para marcar de facto, ligue para a clínica.',
    required: 'obrigatório',
    optional: 'opcional',
    fields: {
      ownerName: 'Nome do tutor',
      phone: 'Contacto telefónico',
      email: 'Email',
      petName: 'Nome do animal',
      reason: 'Motivo',
      reasonPlaceholder: 'Selecione um motivo',
      preferredDate: 'Data preferida',
      preferredDateHint: 'É apenas uma preferência. A data só fica marcada depois de confirmada pela clínica.',
      message: 'Mensagem',
      messageHint: 'Breve descrição do pedido. Máximo de 500 caracteres.',
      phoneHint: 'Ex.: 912 345 678',
    },
    reasons: {
      prevencao: 'Prevenção (check-up, vacinação, desparasitação)',
      diagnostico: 'Exames de diagnóstico',
      cirurgia: 'Cirurgia ou internamento',
      higiene: 'Banho ou tosquia',
      produtos: 'Disponibilidade de produtos',
      outro: 'Outro assunto',
    },
    errors: {
      summary: 'Verifique os campos assinalados:',
      ownerName: 'Indique o nome do tutor.',
      phone: 'Indique um número de telefone válido (9 a 15 dígitos).',
      email: 'Indique um email válido ou deixe o campo vazio.',
      reason: 'Selecione o motivo do pedido.',
      preferredDatePast: 'Escolha uma data a partir de hoje.',
      preferredDateSunday: 'Ao domingo a clínica está encerrada. Escolha outro dia.',
      message: 'A mensagem pode ter no máximo 500 caracteres.',
    },
    privacy: 'Os dados indicados servem apenas para responder ao seu pedido. Saiba mais em',
    privacyLink: 'Privacidade e cookies',
    submit: 'Rever pedido',
    submitLive: 'Enviar pedido',
    submitting: 'A enviar…',
    demoResult: {
      title: 'Pré-visualização do pedido',
      notSent: 'Nada foi enviado. Esta é uma demonstração e a clínica não recebeu este pedido.',
      next: 'Para marcar a consulta, contacte a clínica:',
      edit: 'Editar pedido',
      noDate: 'Sem preferência',
      noValue: '—',
    },
    sent: {
      title: 'Pedido enviado',
      text: 'A clínica recebeu o seu pedido e vai contactá-lo para confirmar o dia e a hora. A marcação só fica feita depois dessa confirmação.',
    },
    unavailable: {
      title: 'Pedido online indisponível',
      text: 'De momento não é possível enviar pedidos pelo website. Contacte a clínica por telefone.',
    },
    error: {
      title: 'Não foi possível enviar o pedido',
      text: 'Ocorreu um problema no envio. Os seus dados mantêm-se no formulário. Tente novamente ou ligue para a clínica.',
    },
    counter: 'caracteres',
  },
  privacyPage: {
    eyebrow: 'Informação legal',
    title: 'Privacidade e cookies',
    draft:
      'Rascunho para validação. Este texto é uma estrutura de trabalho e não foi revisto juridicamente. Deve ser completado e validado pela clínica antes da publicação.',
    sections: [
      {
        title: 'Responsável pelo tratamento',
        text: 'Centro Veterinário Arca de Noé, Rua Senhora Saúde, Lote 2, r/c D, 8375-138 São Bartolomeu de Messines. Contacto: cvet.arcanoe@gmail.com. Identificação fiscal e restantes dados a completar pela clínica.',
      },
      {
        title: 'Que dados recolhemos',
        text: 'Quando envia um pedido de consulta: nome do tutor, contacto telefónico e, se os indicar, email, nome do animal, data preferida e mensagem. Não pedimos dados clínicos detalhados nem anexos neste primeiro contacto.',
      },
      {
        title: 'Para que usamos os dados',
        text: 'Exclusivamente para responder ao seu pedido e combinar a marcação. Fundamento jurídico, prazos de conservação e eventuais subcontratantes (por exemplo, o serviço de envio do formulário) a definir antes do lançamento.',
      },
      {
        title: 'Os seus direitos',
        text: 'Pode pedir o acesso, a retificação ou o apagamento dos seus dados, bem como opor-se ao tratamento, através do email da clínica. Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).',
      },
      {
        title: 'Cookies',
        text: 'Esta versão do website não utiliza cookies de análise, publicidade ou redes sociais, nem ferramentas de medição de audiências. Se no futuro forem adicionados serviços opcionais, será pedido o seu consentimento, com possibilidade de recusa.',
      },
      {
        title: 'Mapas e ligações externas',
        text: 'O botão «Obter direções» abre o Google Maps num novo separador, apenas quando clica. A partir desse momento aplica-se a política de privacidade da Google.',
      },
    ],
    updated: 'Versão de trabalho — outubro de 2026',
  },
  footer: {
    tagline: 'Cuidados veterinários de proximidade em São Bartolomeu de Messines.',
    navTitle: 'Navegação',
    contactTitle: 'Contactos',
    hoursTitle: 'Horário',
    legalTitle: 'Legal',
    rights: 'Centro Veterinário Arca de Noé',
    complaints: 'Livro de Reclamações',
  },
  images: {
    consulta: 'Médico veterinário a auscultar um beagle, com a tutora ao lado',
    tosquia: 'Cão de pelo branco durante uma tosquia',
    banho: 'Cachorro de pelo claro a tomar banho',
    caoPerfil: 'Cão de pelo branco, de perfil, sentado sobre uma mesa',
  },
};

export type Dictionary = typeof pt;
