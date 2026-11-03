import { bookingReasons } from '@/data/clinic';
import type { BookingRequest } from './booking';

export type FieldErrors = Partial<Record<keyof BookingRequest, ErrorCode>>;
export type ErrorCode =
  | 'ownerName'
  | 'phone'
  | 'email'
  | 'reason'
  | 'preferredDatePast'
  | 'preferredDateSunday'
  | 'message';

export const MESSAGE_MAX = 500;

/** Data de hoje (AAAA-MM-DD) no fuso da clínica. */
export function todayInLisbon(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon' }).format(now);
}

export function validateBooking(data: BookingRequest, today = todayInLisbon()): FieldErrors {
  const errors: FieldErrors = {};
  if (data.ownerName.trim().length < 2) errors.ownerName = 'ownerName';

  const digits = data.phone.replace(/[\s().-]/g, '').replace(/^\+/, '');
  if (!/^\d{9,15}$/.test(digits)) errors.phone = 'phone';

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'email';

  if (!(bookingReasons as readonly string[]).includes(data.reason)) errors.reason = 'reason';

  if (data.preferredDate) {
    if (data.preferredDate < today) errors.preferredDate = 'preferredDatePast';
    else if (new Date(`${data.preferredDate}T12:00:00Z`).getUTCDay() === 0) errors.preferredDate = 'preferredDateSunday';
  }

  if (data.message.length > MESSAGE_MAX) errors.message = 'message';
  return errors;
}
