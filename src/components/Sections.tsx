import { productCategories, serviceGroupIds, servicesByGroup, type ProductCategory } from '@/data/clinic';
import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { ContactList, DirectionsLink } from './ContactList';
import { HoursTable } from './Hours';
import { GroupIcon } from './Illustrations';

export function SectionHeading({
  eyebrow, title, lead, id, level = 2, align = 'start',
}: { eyebrow?: string; title: string; lead?: string; id?: string; level?: 1 | 2; align?: 'start' | 'center' }) {
  const H = level === 1 ? 'h1' : 'h2';
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id}>{title}</H>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/** Página interior: cabeçalho editorial com H1. */
export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="page-intro">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} level={1} />
      </div>
    </section>
  );
}

/** Grupos de serviços em cartões (homepage). */
export function ServiceGroupCards({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <ul className="service-cards">
      {serviceGroupIds.map((g, i) => (
        <li key={g} className="service-card">
          <div className="service-card-top">
            <GroupIcon name={g} />
            <span className="service-index" aria-hidden="true">0{i + 1}</span>
          </div>
          <h3>
            <a className="stretched-link" href={pathFor(locale, 'services', g)}>{t.services.groups[g].title}</a>
          </h3>
          <p>{t.services.groups[g].lead}</p>
          <ul className="tag-list">
            {servicesByGroup[g].map((s) => <li key={s}>{t.services.items[s]}</li>)}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function ProductList({ t, items = productCategories }: { t: Dictionary; items?: readonly ProductCategory[] | readonly string[] }) {
  return (
    <ul className="product-list">
      {items.map((p) => {
        const item = t.products.items[p as ProductCategory];
        return (
          <li key={p}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Faq({ t }: { t: Dictionary }) {
  return (
    <div className="faq">
      {t.faq.map((item) => (
        <details key={item.q}>
          <summary>
            <span>{item.q}</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" className="faq-icon">
              <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function UrgentNote({ t }: { t: Dictionary }) {
  return (
    <aside className="urgent-note" aria-label={t.common.urgentTitle}>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v6m0 3.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p><strong>{t.common.urgentTitle}.</strong> {t.common.urgent}</p>
    </aside>
  );
}

/** Bloco de contactos com horário completo e direções. */
export function ContactPanel({
  locale, t, withBook = true, headingLevel = 3,
}: { locale: Locale; t: Dictionary; withBook?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="contact-panel">
      <div className="contact-panel-col">
        <ContactList t={t} />
        <div className="button-row">
          <DirectionsLink t={t} />
          {withBook && <a className="btn btn-primary" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>}
        </div>
      </div>
      <div className="contact-panel-col">
        <H className="panel-title" id="horario">{t.common.fullHours}</H>
        <HoursTable t={t} />
        <p className="small-note">{t.contactPage.holidaysNote}</p>
        <UrgentNote t={t} />
      </div>
    </div>
  );
}
