import type { Metadata } from 'next';
import { isLocale } from '@/content/routes';
import { buildMetadata } from '@/lib/seo';
import { renderPage } from './render';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang, 'home') : {};
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return renderPage(lang, 'home');
}
