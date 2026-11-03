export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

export const pageKeys = ['home', 'clinic', 'services', 'products', 'contact', 'privacy'] as const;
export type PageKey = (typeof pageKeys)[number];

/** Slugs por idioma. O seletor de idioma usa esta tabela para manter a página equivalente. */
export const slugs: Record<Locale, Record<PageKey, string>> = {
  pt: { home: '', clinic: 'a-clinica', services: 'servicos', products: 'produtos', contact: 'contactos', privacy: 'privacidade' },
  en: { home: '', clinic: 'the-clinic', services: 'services', products: 'products', contact: 'contact', privacy: 'privacy' },
};

export const htmlLang: Record<Locale, string> = { pt: 'pt-PT', en: 'en' };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pageFromSlug(locale: Locale, slug: string): PageKey | undefined {
  return pageKeys.find((key) => key !== 'home' && slugs[locale][key] === slug);
}

/** Caminho absoluto (com barra final) de uma página num idioma. */
export function pathFor(locale: Locale, page: PageKey, hash?: string, query?: string): string {
  const slug = slugs[locale][page];
  const base = slug ? `/${locale}/${slug}/` : `/${locale}/`;
  return `${base}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}
