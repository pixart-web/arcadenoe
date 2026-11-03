import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, pageFromSlug, pageKeys, slugs } from '@/content/routes';
import { buildMetadata } from '@/lib/seo';
import { renderPage } from '../render';

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    pageKeys.filter((p) => p !== 'home').map((p) => ({ lang, slug: slugs[lang][p] })),
  );
}

async function resolve(params: Props['params']) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return null;
  const page = pageFromSlug(lang, slug);
  return page ? { lang, page } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  return r ? buildMetadata(r.lang, r.page) : {};
}

export default async function InnerPage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  return renderPage(r.lang, r.page);
}
