import { getDictionary } from '@/content';
import type { Locale, PageKey } from '@/content/routes';
import { veterinaryJsonLd } from '@/lib/seo';
import { ClinicPage } from '@/components/pages/ClinicPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { HomePage } from '@/components/pages/HomePage';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { ProductsPage } from '@/components/pages/ProductsPage';
import { ServicesPage } from '@/components/pages/ServicesPage';

export function renderPage(locale: Locale, page: PageKey) {
  const t = getDictionary(locale);
  const props = { locale, t };
  const content = {
    home: <HomePage {...props} />,
    clinic: <ClinicPage {...props} />,
    services: <ServicesPage {...props} />,
    products: <ProductsPage {...props} />,
    contact: <ContactPage {...props} />,
    privacy: <PrivacyPage t={t} />,
  }[page];

  const withJsonLd = page === 'home' || page === 'contact';
  return (
    <>
      {withJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veterinaryJsonLd(locale)) }} />
      )}
      {content}
    </>
  );
}
