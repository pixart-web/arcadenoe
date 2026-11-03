import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { photos } from '@/data/images';
import { Photo } from '../Photo';
import { PageIntro, SectionHeading } from '../Sections';

export function ClinicPage({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.clinicPage;
  return (
    <>
      <PageIntro eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section section-flush-top">
        <div className="container clinic-grid">
          <div className="clinic-art"><Photo photo={photos.caoPerfil} alt={t.images.caoPerfil} sizes="(min-width: 900px) 460px, 100vw" className="rounded-photo" /></div>
          <div className="clinic-sections">
            {c.sections.map((s) => (
              <article key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint" aria-labelledby="clinic-values">
        <div className="container">
          <SectionHeading id="clinic-values" title={c.valuesTitle} />
          <ul className="values">
            {c.values.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>{c.visitTitle}</h2>
            <p>{c.visitText}</p>
          </div>
          <div className="button-row">
            <a className="btn btn-primary btn-lg" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>
            <a className="btn btn-secondary btn-lg" href={pathFor(locale, 'services')}>{t.cta.services}</a>
          </div>
        </div>
      </section>
    </>
  );
}
