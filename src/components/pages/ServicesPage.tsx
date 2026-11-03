import { serviceGroupIds, servicesByGroup } from '@/data/clinic';
import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { GroupIcon } from '../Illustrations';
import { PageIntro, UrgentNote } from '../Sections';

export function ServicesPage({ locale, t }: { locale: Locale; t: Dictionary }) {
  const s = t.servicesPage;
  return (
    <>
      <PageIntro eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <nav className="container jump-nav" aria-label={s.eyebrow}>
        <ul>
          {serviceGroupIds.map((g) => (
            <li key={g}><a href={`#${g}`}>{t.services.groups[g].title}</a></li>
          ))}
        </ul>
      </nav>
      <div className="container service-groups">
        {serviceGroupIds.map((g, i) => {
          const group = t.services.groups[g];
          return (
            <section key={g} id={g} className="service-group" aria-labelledby={`${g}-title`}>
              <div className="service-group-head">
                <span className="service-index" aria-hidden="true">0{i + 1}</span>
                <GroupIcon name={g} />
              </div>
              <div className="service-group-body">
                <h2 id={`${g}-title`}>{group.title}</h2>
                <p className="lead">{group.lead}</p>
                <p>{group.body}</p>
              </div>
              <div className="service-group-side">
                <h3 className="side-title">{s.includes}</h3>
                <ul className="check-list">
                  {servicesByGroup[g].map((item) => <li key={item}>{t.services.items[item]}</li>)}
                </ul>
                <a className="btn btn-primary" href={pathFor(locale, 'contact', 'pedido', `motivo=${g}`)}>
                  {t.cta.book}
                  <span className="visually-hidden">: {group.title}</span>
                </a>
              </div>
            </section>
          );
        })}
      </div>
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{s.closingTitle}</h2>
              <p>{s.closingText}</p>
            </div>
            <div className="button-row">
              <a className="btn btn-primary btn-lg" href={pathFor(locale, 'contact', 'pedido', 'motivo=outro')}>{t.cta.book}</a>
            </div>
          </div>
          <UrgentNote t={t} />
        </div>
      </section>
    </>
  );
}
