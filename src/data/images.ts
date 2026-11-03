/**
 * Fotografias do site atual (vet-arcadenoe.com), usadas com autorização confirmada pela PIXART em 20/10/2026.
 * Originais recolhidos em 20/10/2026; versões otimizadas (JPEG + WebP) em public/images/.
 * Origem e notas em docs/CONTEUDOS-E-FONTES.md. Não representam a equipa nem as instalações da clínica.
 */
export type Photo = { src: string; widths: number[]; width: number; height: number };

export const photos = {
  consulta: { src: 'consulta', widths: [640, 864], width: 864, height: 1080 },
  tosquia: { src: 'tosquia', widths: [800, 1400], width: 1400, height: 788 },
  banho: { src: 'banho', widths: [800, 1400], width: 1400, height: 788 },
  caoPerfil: { src: 'cao-perfil', widths: [800, 1400], width: 1400, height: 788 },
} satisfies Record<string, Photo>;

export const logoSymbol = { src: '/images/logo-simbolo.png', width: 90, height: 55 };
