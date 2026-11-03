'use client';

import { useEffect, useState } from 'react';
import { clinic } from '@/data/clinic';
import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';

/** Barra inferior em mobile. Esconde-se enquanto um campo de formulário tem foco, para não tapar o teclado/campo. */
export function MobileBar({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches('input, select, textarea');
    const onIn = (e: FocusEvent) => isField(e.target) && setHidden(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setHidden(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  return (
    <nav className="mobile-bar" aria-label={t.a11y.quickActions} data-hidden={hidden}>
      <a className="btn btn-secondary" href={clinic.phone.href}>
        <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
          <path d="M6.5 2.5l2 4-1.8 1.4a10 10 0 004.9 4.9L13 11l4 2-.6 3.2c-.2.8-.9 1.3-1.7 1.3C8.2 17 3 11.8 2.5 5.3c0-.8.5-1.5 1.3-1.7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        {t.cta.call}
      </a>
      <a className="btn btn-primary" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>
    </nav>
  );
}
