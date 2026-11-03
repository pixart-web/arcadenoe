import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { photos } from '@/data/images';
import { Photo } from '../Photo';
import { PageIntro, ProductList } from '../Sections';

export function ProductsPage({ locale, t }: { locale: Locale; t: Dictionary }) {
  const p = t.productsPage;
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <div className="container">
        <Photo photo={photos.banho} alt={t.images.banho} sizes="(min-width: 1240px) 1200px, 100vw" className="rounded-photo banner-photo" />
      </div>
      <div className="container product-groups">
        {p.groups.map((g) => (
          <section key={g.title} className="product-group" aria-labelledby={`pg-${g.items[0]}`}>
            <h2 id={`pg-${g.items[0]}`}>{g.title}</h2>
            <ProductList t={t} items={g.items} />
          </section>
        ))}
      </div>
      <section className="section">
        <div className="container two-col">
          <div className="note-card">
            <h2>{p.adviceTitle}</h2>
            <p>{p.adviceText}</p>
          </div>
          <div className="note-card note-card-dark">
            <h2>{p.availabilityTitle}</h2>
            <p>{p.availabilityText}</p>
            <a className="btn btn-on-dark" href={pathFor(locale, 'contact', 'pedido', 'motivo=produtos')}>{t.cta.availability}</a>
          </div>
        </div>
      </section>
    </>
  );
}
