import type { MetadataRoute } from 'next';
import { htmlLang, locales, pageKeys, pathFor } from '@/content/routes';
import { siteUrl } from '@/lib/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return pageKeys.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}${pathFor(locale, page)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${siteUrl}${pathFor(l, page)}`])),
      },
    })),
  );
}
