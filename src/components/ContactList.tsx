import { clinic } from '@/data/clinic';
import type { Dictionary } from '@/content';

export function ContactList({ t, showAddress = true }: { t: Dictionary; showAddress?: boolean }) {
  return (
    <dl className="contact-list">
      <div>
        <dt>{t.common.phone}</dt>
        <dd><a href={clinic.phone.href}>{clinic.phone.display}</a></dd>
      </div>
      <div>
        <dt>{t.common.mobile}</dt>
        <dd><a href={clinic.mobile.href}>{clinic.mobile.display}</a></dd>
      </div>
      <div>
        <dt>{t.common.email}</dt>
        <dd><a href={clinic.email.href}>{clinic.email.display}</a></dd>
      </div>
      {showAddress && (
        <div>
          <dt>{t.common.address}</dt>
          <dd>
            <address>
              {clinic.address.street}
              <br />
              {clinic.address.postalCode} {clinic.address.locality}
            </address>
          </dd>
        </div>
      )}
    </dl>
  );
}

export function DirectionsLink({ t, className = 'btn btn-secondary' }: { t: Dictionary; className?: string }) {
  return (
    <a className={className} href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer">
      {t.cta.directions}
      <span className="visually-hidden"> {t.a11y.opensExternal}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="ext-icon">
        <path d="M6 3h7v7M13 3L4 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </a>
  );
}
