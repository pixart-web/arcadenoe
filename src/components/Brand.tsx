import { logoSymbol } from '@/data/images';
import type { Locale } from '@/content/routes';

/**
 * Marca: símbolo do logótipo atual (recortado do ficheiro publicado no site, 100×100 px) + nome em texto.
 * Uso autorizado (PIXART, 20/10/2026). Substituir pelo ficheiro vetorial original quando a clínica o fornecer.
 */
export function Brand({ locale, onDark = false }: { locale: Locale; onDark?: boolean }) {
  return (
    <span className="brand">
      <span className={onDark ? 'brand-mark brand-mark-chip' : 'brand-mark'}>
        {/* eslint-disable-next-line @next/next/no-img-element -- logótipo pequeno, exportação estática */}
        <img src={logoSymbol.src} width={logoSymbol.width} height={logoSymbol.height} alt="" />
      </span>
      <span className="brand-text">
        <span className="brand-kicker">{locale === 'pt' ? 'Centro Veterinário' : 'Veterinary Centre'}</span>
        <span className="brand-name">Arca de Noé</span>
      </span>
    </span>
  );
}
