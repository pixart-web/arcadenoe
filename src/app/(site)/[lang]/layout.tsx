import '../../globals.css';
import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { preload } from 'react-dom';
import { getDictionary } from '@/content';
import { htmlLang, isLocale, locales } from '@/content/routes';
import { isDemo } from '@/lib/config';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileBar } from '@/components/MobileBar';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: '#173F38', width: 'device-width', initialScale: 1 };

export default async function SiteLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  // Fontes alojadas localmente (subconjunto latino, OFL): pré-carregadas para não atrasar o título principal.
  preload('/fonts/manrope-latin-wght.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/inter-latin-wght.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang={htmlLang[lang]}>
      <body>
        <a className="skip-link" href="#conteudo">{t.a11y.skip}</a>
        {isDemo && (
          <p className="demo-strip">
            {t.meta.demoLabel} <span className="demo-sep" aria-hidden="true">·</span> <span className="demo-note">{t.meta.demoNote}</span>
          </p>
        )}
        <Header locale={lang} t={t} />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <Footer locale={lang} t={t} />
        <MobileBar locale={lang} t={t} />
      </body>
    </html>
  );
}
