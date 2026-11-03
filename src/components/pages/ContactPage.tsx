import type { Dictionary } from '@/content';
import type { Locale } from '@/content/routes';
import { BookingForm } from '../BookingForm';
import { ContactPanel, PageIntro, SectionHeading } from '../Sections';

export function ContactPage({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contactPage;
  return (
    <>
      <PageIntro eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section section-flush-top">
        <div className="container">
          <ContactPanel locale={locale} t={t} withBook={false} headingLevel={2} />
        </div>
      </section>
      <section className="section section-tint" id="pedido" aria-labelledby="form-title">
        <div className="container form-layout">
          <div>
            <SectionHeading id="form-title" title={c.formTitle} lead={c.formLead} />
            <ol className="steps steps-compact">
              {t.home.steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="form-card">
            <BookingForm locale={locale} t={t} />
          </div>
        </div>
      </section>
    </>
  );
}
