import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { photos } from '@/data/images';
import { Photo } from '../Photo';
import { ContactPanel, Faq, ProductList, SectionHeading, ServiceGroupCards } from '../Sections';

export function HomePage({ locale, t }: { locale: Locale; t: Dictionary }) {
  const h = t.home;
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.title}</h1>
            <p className="lead">{h.lead}</p>
            <div className="button-row">
              <a className="btn btn-primary btn-lg" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>
              <a className="btn btn-secondary btn-lg" href={pathFor(locale, 'services')}>{t.cta.services}</a>
            </div>
            <p className="hero-note">
              <span className="dot" aria-hidden="true" /> {h.heroNote}
            </p>
          </div>
          <div className="hero-media">
            <Photo photo={photos.consulta} alt={t.images.consulta} sizes="(min-width: 900px) 440px, 80vw" priority className="arch-photo" />
            <span className="hero-sun" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="facts" aria-label={h.facts.how.label}>
        <div className="container">
          <dl className="facts-grid">
            <div>
              <dt>{h.facts.where.label}</dt>
              <dd>{h.facts.where.value}</dd>
            </div>
            <div>
              <dt>{h.facts.how.label}</dt>
              <dd>{h.facts.how.value}</dd>
            </div>
            <div>
              <dt>{h.facts.when.label}</dt>
              <dd>
                {h.facts.when.value}
                <a className="text-link" href="#horario">{h.facts.when.link}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="home-services">
        <div className="container">
          <div className="split-heading">
            <SectionHeading id="home-services" eyebrow={h.servicesEyebrow} title={h.servicesTitle} lead={h.servicesLead} />
            <a className="btn btn-secondary" href={pathFor(locale, 'services')}>{t.cta.allServices}</a>
          </div>
          <ServiceGroupCards locale={locale} t={t} />
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="home-clinic">
        <div className="container clinic-teaser">
          <Photo photo={photos.tosquia} alt={t.images.tosquia} sizes="(min-width: 900px) 520px, 100vw" className="rounded-photo" />
          <div className="prose">
            <SectionHeading id="home-clinic" eyebrow={h.clinicEyebrow} title={h.clinicTitle} />
            {h.clinicText.map((p) => <p key={p}>{p}</p>)}
            <a className="text-link text-link-arrow" href={pathFor(locale, 'clinic')}>{t.cta.clinic}</a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="home-steps">
        <div className="container">
          <SectionHeading id="home-steps" eyebrow={h.stepsEyebrow} title={h.stepsTitle} />
          <ol className="steps">
            {h.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="button-row">
            <a className="btn btn-primary" href={pathFor(locale, 'contact', 'pedido')}>{t.cta.book}</a>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="home-products">
        <div className="container products-band">
          <div>
            <SectionHeading id="home-products" eyebrow={h.productsEyebrow} title={h.productsTitle} lead={h.productsLead} />
            <a className="btn btn-on-dark" href={pathFor(locale, 'products')}>{t.cta.products}</a>
          </div>
          <ProductList t={t} />
        </div>
      </section>

      <section className="section" aria-labelledby="home-faq">
        <div className="container two-col">
          <SectionHeading id="home-faq" eyebrow={h.faqEyebrow} title={h.faqTitle} />
          <Faq t={t} />
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="home-contact">
        <div className="container">
          <SectionHeading id="home-contact" eyebrow={h.contactEyebrow} title={h.contactTitle} lead={h.contactLead} />
          <ContactPanel locale={locale} t={t} />
        </div>
      </section>
    </>
  );
}
