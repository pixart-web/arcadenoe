import type { Metadata } from 'next';
import { clinic, openingHours } from '@/data/clinic';
import { getDictionary } from '@/content';
import { htmlLang, locales, pathFor, type Locale, type PageKey } from '@/content/routes';
import { isDemo, siteUrl } from './config';

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const t = getDictionary(locale);
  const { title, description } = t.meta.pages[page];
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = pathFor(l, page);
  languages['x-default'] = pathFor('pt', page);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: pathFor(locale, page), languages },
    // A demonstração nunca é indexada. No lançamento autorizado: NEXT_PUBLIC_DEMO=false.
    robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: t.meta.siteName,
      title,
      description,
      locale: locale === 'pt' ? 'pt_PT' : 'en_GB',
      url: pathFor(locale, page),
    },
    formatDetection: { telephone: false },
    icons: { icon: '/favicon.svg' },
  };
}

/** Dados estruturados apenas com dados publicados: sem coordenadas, avaliações ou preços. */
export function veterinaryJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    '@id': `${siteUrl}/#clinica`,
    name: clinic.name,
    url: `${siteUrl}${pathFor(locale, 'home')}`,
    telephone: clinic.phone.display.replace(/\s/g, ''),
    email: clinic.email.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      postalCode: clinic.address.postalCode,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.region,
      addressCountry: clinic.address.country,
    },
    openingHoursSpecification: openingHours
      .filter((d) => d.slots.length > 0)
      .flatMap((d) =>
        d.slots.map(([opens, closes]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: d.schemaDays,
          opens,
          closes,
        })),
      ),
    areaServed: `${clinic.locality}, ${clinic.municipality}`,
  };
}
