/**
 * Dados factuais da clínica — fonte única para contactos, horário, serviços e produtos.
 *
 * Estado de cada dado:
 *  - "site":       publicado em https://www.vet-arcadenoe.com/ (levantamento de 20/10/2026, fornecido no briefing;
 *                  o site não pôde ser revalidado a partir do ambiente de desenvolvimento — ver docs/CONTEUDOS-E-FONTES.md)
 *  - "confirmar":  existe uma versão provisória, mas tem de ser confirmada com o cliente antes do lançamento
 *  - "editorial":  conteúdo proposto pela PIXART
 */

export type DataStatus = 'site' | 'confirmar' | 'editorial';

export const clinic = {
  name: 'Centro Veterinário Arca de Noé',
  shortName: 'Arca de Noé',
  locality: 'São Bartolomeu de Messines',
  municipality: 'Silves',
  region: 'Algarve',
  address: {
    // Morada exatamente como publicada; normalização a confirmar antes do lançamento.
    published: 'Rua Senhora Saúde Lote 2-r/c-D, 8375-138 S. Bart. Messines, Portugal',
    street: 'Rua Senhora Saúde, Lote 2, r/c D',
    postalCode: '8375-138',
    locality: 'São Bartolomeu de Messines',
    country: 'PT',
    status: 'confirmar' as DataStatus,
  },
  phone: { display: '+351 282 338 591', href: 'tel:+351282338591', status: 'site' as DataStatus },
  mobile: { display: '+351 912 242 222', href: 'tel:+351912242222', status: 'site' as DataStatus },
  email: { display: 'cvet.arcanoe@gmail.com', href: 'mailto:cvet.arcanoe@gmail.com', status: 'site' as DataStatus },
  /**
   * Destino de direções: coordenadas do mapa Google incorporado na página /localizacao do site atual
   * (recolhido em 20/10/2026; etiqueta «R. Sra. da Saúde 2, 8375-138 São Bartolomeu de Messines»).
   * Abre por ação do visitante; sem mapa embebido. Confirmar o ponto exato com a clínica.
   */
  mapPoint: { lat: 37.25538187003568, lng: -8.290771110461034, status: 'site' as DataStatus },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.25538187003568%2C-8.290771110461034',
  /** WhatsApp desativado até confirmação pela clínica. */
  whatsappEnabled: false,
} as const;

/** Horário publicado. Estático de propósito: sem «Aberto agora» (feriados e exceções não são conhecidos). */
export const openingHours = [
  { days: 'weekdays', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], slots: [['10:00', '13:30'], ['16:30', '19:30']] },
  { days: 'saturday', schemaDays: ['Saturday'], slots: [['10:00', '13:30']] },
  { days: 'sunday', schemaDays: ['Sunday'], slots: [] },
] as const;

export type DayGroup = (typeof openingHours)[number]['days'];

/** Grupos de serviços (agrupamento editorial). Todos os 11 serviços publicados estão contemplados. */
export const serviceGroupIds = ['prevencao', 'diagnostico', 'cirurgia', 'higiene'] as const;
export type ServiceGroupId = (typeof serviceGroupIds)[number];

export const servicesByGroup: Record<ServiceGroupId, readonly string[]> = {
  prevencao: ['checkups', 'vacinacoes', 'desparasitacoes'],
  diagnostico: ['analises', 'radiografia', 'ecografia', 'eletrocardiografia'],
  cirurgia: ['cirurgia', 'internamento'],
  higiene: ['banhos', 'tosquias'],
};

/** Categorias de produtos publicadas (sem preços, marcas ou stock). */
export const productCategories = [
  'racoes',
  'guloseimas',
  'vitaminas',
  'higiene',
  'medicamentos',
  'acessorios',
  'brinquedos',
  'camas',
] as const;
export type ProductCategory = (typeof productCategories)[number];

/** Motivos disponíveis no pedido de consulta (também usados para pré-seleção por URL: ?motivo=...). */
export const bookingReasons = ['prevencao', 'diagnostico', 'cirurgia', 'higiene', 'produtos', 'outro'] as const;
export type BookingReason = (typeof bookingReasons)[number];
