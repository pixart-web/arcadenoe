'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { bookingReasons, clinic, type BookingReason } from '@/data/clinic';
import type { Dictionary } from '@/content';
import { pathFor, type Locale } from '@/content/routes';
import { submitBookingRequest, type BookingRequest, type BookingResult } from '@/lib/booking';
import { bookingMode } from '@/lib/config';
import { MESSAGE_MAX, todayInLisbon, validateBooking, type FieldErrors } from '@/lib/validation';

const empty: BookingRequest = { ownerName: '', phone: '', email: '', petName: '', reason: '', preferredDate: '', message: '' };
const fieldOrder: (keyof BookingRequest)[] = ['ownerName', 'phone', 'email', 'petName', 'reason', 'preferredDate', 'message'];

type View = 'form' | BookingResult['status'];

export function BookingForm({ locale, t }: { locale: Locale; t: Dictionary }) {
  const f = t.form;
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [data, setData] = useState<BookingRequest>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [view, setView] = useState<View>('form');
  const [busy, setBusy] = useState(false);
  const [today, setToday] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pré-seleção do motivo a partir de ?motivo=... (links contextuais em Serviços e Produtos).
  useEffect(() => {
    setToday(todayInLisbon());
    const reason = new URLSearchParams(window.location.search).get('motivo');
    if (reason && (bookingReasons as readonly string[]).includes(reason)) {
      setData((d) => ({ ...d, reason: reason as BookingReason }));
    }
  }, []);

  useEffect(() => {
    if (view !== 'form') resultRef.current?.focus();
  }, [view]);

  const update = (name: keyof BookingRequest, value: string) => {
    const next = { ...data, [name]: value };
    setData(next);
    // Depois da primeira tentativa, a validação acompanha a correção do campo.
    if (submitted) setErrors(validateBooking(next));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validateBooking(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setBusy(true);
    const result = await submitBookingRequest(data, locale);
    setBusy(false);
    setView(result.status);
  };

  const backToForm = () => {
    setView('form');
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('input, select, textarea')?.focus());
  };

  const errorIds = Object.keys(errors) as (keyof BookingRequest)[];
  const describedBy = (name: keyof BookingRequest, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : '', errors[name] ? id(`${name}-error`) : ''].filter(Boolean).join(' ') || undefined;

  const fieldError = (name: keyof BookingRequest) =>
    errors[name] ? (
      <p className="field-error" id={id(`${name}-error`)}>
        <span aria-hidden="true">!</span> {f.errors[errors[name]!]}
      </p>
    ) : null;

  const phoneAlternatives = (
    <ul className="result-actions">
      <li><a className="btn btn-primary" href={clinic.phone.href}>{t.cta.callClinic} · {clinic.phone.display}</a></li>
      <li><a className="btn btn-secondary" href={clinic.mobile.href}>{t.common.mobile} · {clinic.mobile.display}</a></li>
    </ul>
  );

  if (view !== 'form') {
    const formatDate = (iso: string) =>
      new Intl.DateTimeFormat(locale === 'pt' ? 'pt-PT' : 'en-GB', { dateStyle: 'full', timeZone: 'UTC' }).format(
        new Date(`${iso}T12:00:00Z`),
      );
    return (
      <div className="booking-result" ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
        {view === 'demo' && (
          <>
            <p className="demo-pill">{f.demoBanner}</p>
            <h3>{f.demoResult.title}</h3>
            <p className="result-strong">{f.demoResult.notSent}</p>
            <dl className="summary-list">
              <div><dt>{f.fields.ownerName}</dt><dd>{data.ownerName}</dd></div>
              <div><dt>{f.fields.phone}</dt><dd>{data.phone}</dd></div>
              <div><dt>{f.fields.email}</dt><dd>{data.email || f.demoResult.noValue}</dd></div>
              <div><dt>{f.fields.petName}</dt><dd>{data.petName || f.demoResult.noValue}</dd></div>
              <div><dt>{f.fields.reason}</dt><dd>{data.reason ? f.reasons[data.reason] : f.demoResult.noValue}</dd></div>
              <div>
                <dt>{f.fields.preferredDate}</dt>
                <dd>{data.preferredDate ? formatDate(data.preferredDate) : f.demoResult.noDate}</dd>
              </div>
              <div><dt>{f.fields.message}</dt><dd className="summary-message">{data.message || f.demoResult.noValue}</dd></div>
            </dl>
            <p>{f.demoResult.next}</p>
            {phoneAlternatives}
          </>
        )}
        {view === 'sent' && (
          <>
            <h3>{f.sent.title}</h3>
            <p>{f.sent.text}</p>
          </>
        )}
        {view === 'unavailable' && (
          <>
            <h3>{f.unavailable.title}</h3>
            <p>{f.unavailable.text}</p>
            {phoneAlternatives}
          </>
        )}
        {view === 'error' && (
          <>
            <h3>{f.error.title}</h3>
            <p>{f.error.text}</p>
            {phoneAlternatives}
          </>
        )}
        {view !== 'sent' && (
          <button type="button" className="btn btn-ghost" onClick={backToForm}>{f.demoResult.edit}</button>
        )}
      </div>
    );
  }

  return (
    <form ref={formRef} className="booking-form" noValidate onSubmit={onSubmit}>
      {bookingMode === 'demo' && (
        <div className="demo-notice">
          <p className="demo-pill">{f.demoBanner}</p>
          <p>{f.demoExplain}</p>
        </div>
      )}

      <p className="form-urgent">
        <strong>{t.common.urgentFormNote}</strong> {t.common.urgent}{' '}
        <a href={clinic.phone.href}>{clinic.phone.display}</a>
      </p>

      {errorIds.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert">
          <p>{f.errors.summary}</p>
          <ul>
            {fieldOrder.filter((n) => errors[n]).map((n) => (
              <li key={n}><a href={`#${id(n)}`}>{f.errors[errors[n]!]}</a></li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor={id('ownerName')}>{f.fields.ownerName} <span className="req">({f.required})</span></label>
          <input
            id={id('ownerName')} name="ownerName" type="text" autoComplete="name" required
            value={data.ownerName} onChange={(e) => update('ownerName', e.target.value)}
            aria-invalid={!!errors.ownerName} aria-describedby={describedBy('ownerName')}
          />
          {fieldError('ownerName')}
        </div>

        <div className="field">
          <label htmlFor={id('phone')}>{f.fields.phone} <span className="req">({f.required})</span></label>
          <input
            id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" required
            value={data.phone} onChange={(e) => update('phone', e.target.value)}
            aria-invalid={!!errors.phone} aria-describedby={describedBy('phone', true)}
          />
          <p className="field-hint" id={id('phone-hint')}>{f.fields.phoneHint}</p>
          {fieldError('phone')}
        </div>

        <div className="field">
          <label htmlFor={id('email')}>{f.fields.email} <span className="opt">({f.optional})</span></label>
          <input
            id={id('email')} name="email" type="email" autoComplete="email"
            value={data.email} onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={describedBy('email')}
          />
          {fieldError('email')}
        </div>

        <div className="field">
          <label htmlFor={id('petName')}>{f.fields.petName} <span className="opt">({f.optional})</span></label>
          <input
            id={id('petName')} name="petName" type="text"
            value={data.petName} onChange={(e) => update('petName', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor={id('reason')}>{f.fields.reason} <span className="req">({f.required})</span></label>
          <select
            id={id('reason')} name="reason" required
            value={data.reason} onChange={(e) => update('reason', e.target.value)}
            aria-invalid={!!errors.reason} aria-describedby={describedBy('reason')}
          >
            <option value="">{f.fields.reasonPlaceholder}</option>
            {bookingReasons.map((r) => (
              <option key={r} value={r}>{f.reasons[r]}</option>
            ))}
          </select>
          {fieldError('reason')}
        </div>

        <div className="field">
          <label htmlFor={id('preferredDate')}>{f.fields.preferredDate} <span className="opt">({f.optional})</span></label>
          <input
            id={id('preferredDate')} name="preferredDate" type="date" min={today || undefined}
            value={data.preferredDate} onChange={(e) => update('preferredDate', e.target.value)}
            aria-invalid={!!errors.preferredDate} aria-describedby={describedBy('preferredDate', true)}
          />
          <p className="field-hint" id={id('preferredDate-hint')}>{f.fields.preferredDateHint}</p>
          {fieldError('preferredDate')}
        </div>

        <div className="field field-full">
          <label htmlFor={id('message')}>{f.fields.message} <span className="opt">({f.optional})</span></label>
          <textarea
            id={id('message')} name="message" rows={4}
            value={data.message} onChange={(e) => update('message', e.target.value)}
            aria-invalid={!!errors.message} aria-describedby={describedBy('message', true)}
          />
          <p className="field-hint" id={id('message-hint')}>
            {f.fields.messageHint}{' '}
            <span className={data.message.length > MESSAGE_MAX ? 'counter over' : 'counter'}>
              {data.message.length}/{MESSAGE_MAX} {f.counter}
            </span>
          </p>
          {fieldError('message')}
        </div>
      </div>

      <p className="form-privacy">
        {f.privacy} <a href={pathFor(locale, 'privacy')}>{f.privacyLink}</a>.
      </p>

      <button type="submit" className="btn btn-primary btn-lg" disabled={busy} aria-disabled={busy}>
        {busy ? f.submitting : bookingMode === 'demo' ? f.submit : f.submitLive}
      </button>
    </form>
  );
}
