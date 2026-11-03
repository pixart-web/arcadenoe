import type { Dictionary } from '@/content';
import { pathFor, type Locale, type PageKey } from '@/content/routes';
import { isDemo } from '@/lib/config';
import { Brand } from './Brand';
import { ContactList } from './ContactList';
import { HoursTable } from './Hours';

const footerPages: PageKey[] = ['home', 'clinic', 'services', 'products', 'contact'];

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand locale={locale} onDark />
          <p>{t.footer.tagline}</p>
          <a className="btn btn-on-dark" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>
        </div>
        <nav aria-label={t.a11y.footerNav}>
          <h2 className="footer-title">{t.footer.navTitle}</h2>
          <ul className="footer-links">
            {footerPages.map((p) => (
              <li key={p}><a href={pathFor(locale, p)}>{t.nav[p]}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="footer-title">{t.footer.contactTitle}</h2>
          <ContactList t={t} />
        </div>
        <div>
          <h2 className="footer-title">{t.footer.hoursTitle}</h2>
          <HoursTable t={t} compact />
          <p className="footer-urgent">{t.common.urgent}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {t.footer.rights}</p>
        <ul className="footer-legal">
          <li><a href={pathFor(locale, 'privacy')}>{t.nav.privacy}</a></li>
          <li>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">
              {t.footer.complaints}<span className="visually-hidden"> {t.a11y.opensExternal}</span>
            </a>
          </li>
        </ul>
        {isDemo && <p className="footer-demo">{t.meta.demoLabel} · {t.meta.demoNote}</p>}
      </div>
    </footer>
  );
}
