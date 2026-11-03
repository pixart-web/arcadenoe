import type { Dictionary } from '@/content';
import { PageIntro } from '../Sections';

export function PrivacyPage({ t }: { t: Dictionary }) {
  const p = t.privacyPage;
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} title={p.title} />
      <section className="section section-flush-top">
        <div className="container legal">
          <p className="draft-callout" role="note">{p.draft}</p>
          {p.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <p className="small-note">{p.updated}</p>
        </div>
      </section>
    </>
  );
}
