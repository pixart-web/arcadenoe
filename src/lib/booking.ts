import { bookingEndpoint, bookingMode } from './config';
import type { BookingReason } from '@/data/clinic';
import type { Locale } from '@/content/routes';

export type BookingRequest = {
  ownerName: string;
  phone: string;
  email: string;
  petName: string;
  reason: BookingReason | '';
  preferredDate: string;
  message: string;
};

export type BookingResult =
  | { status: 'demo' }
  | { status: 'sent' }
  | { status: 'unavailable' }
  | { status: 'error' };

/**
 * Interface de envio substituível.
 * - demo: não faz pedidos de rede.
 * - api: POST JSON para NEXT_PUBLIC_BOOKING_ENDPOINT. Só devolve "sent" com resposta 2xx e corpo {"ok": true}.
 *   Sem endpoint configurado devolve "unavailable" (o formulário mostra a alternativa por telefone).
 */
export async function submitBookingRequest(data: BookingRequest, locale: Locale): Promise<BookingResult> {
  if (bookingMode === 'demo') return { status: 'demo' };
  if (!bookingEndpoint) return { status: 'unavailable' };

  try {
    const response = await fetch(bookingEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, locale }),
    });
    if (!response.ok) return { status: 'error' };
    const body = (await response.json().catch(() => null)) as { ok?: unknown } | null;
    return body?.ok === true ? { status: 'sent' } : { status: 'error' };
  } catch {
    return { status: 'error' };
  }
}
