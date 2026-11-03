'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/content';
import { locales, pageFromSlug, pathFor, type Locale, type PageKey } from '@/content/routes';
import { Brand } from './Brand';

const navPages: PageKey[] = ['home', 'clinic', 'services', 'products', 'contact'];

/** Página atual a partir do caminho (usado para o estado ativo e para o seletor de idioma). */
export function useCurrentPage(locale: Locale): PageKey {
  const pathname = usePathname() || '';
  const segment = pathname.split('/').filter(Boolean)[1] ?? '';
  return (segment && pageFromSlug(locale, segment)) || 'home';
}

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const current = useCurrentPage(locale);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Menu móvel: foco no primeiro link, Escape fecha, Tab circula dentro do painel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).concat(
        toggleRef.current ? [toggleRef.current] : [],
      );
    focusables()[0]?.focus();
    document.body.classList.add('menu-open');

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 960 && close(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open, close]);

  const languageSwitch = (
    <ul className="lang-switch" aria-label={t.a11y.language}>
      {locales.map((l) => (
        <li key={l}>
          <a
            href={pathFor(l, current)}
            hrefLang={l === 'pt' ? 'pt-PT' : 'en'}
            lang={l === 'pt' ? 'pt-PT' : 'en'}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={l === 'pt' ? 'Português' : 'English'}
          >
            {l.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href={pathFor(locale, 'home')} aria-label={`${t.meta.siteName} — ${t.a11y.home}`}>
          <Brand locale={locale} />
        </a>

        <nav className="main-nav" aria-label={t.a11y.mainNav}>
          <ul>
            {navPages.map((p) => (
              <li key={p}>
                <a href={pathFor(locale, p)} aria-current={p === current ? 'page' : undefined}>
                  {t.nav[p]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          {languageSwitch}
          <a className="btn btn-primary btn-sm header-cta" href={pathFor(locale, 'contact', 'pedido')}>
            {t.cta.book}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="menu-toggle-bars" aria-hidden="true" data-open={open} />
            <span className="visually-hidden">{open ? t.a11y.closeMenu : t.a11y.openMenu}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
        <nav aria-label={t.a11y.mainNav}>
          <ul>
            {navPages.map((p) => (
              <li key={p}>
                <a href={pathFor(locale, p)} aria-current={p === current ? 'page' : undefined} onClick={() => close(false)}>
                  {t.nav[p]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-footer">
          {languageSwitch}
          <a className="btn btn-primary" href={pathFor(locale, 'contact', 'pedido')} onClick={() => close(false)}>
            {t.cta.book}
          </a>
        </div>
      </div>
    </header>
  );
}
