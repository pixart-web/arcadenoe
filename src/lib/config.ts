/** Configuração pública (sem credenciais). Ver .env.example. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vet-arcadenoe.com').replace(/\/$/, '');
export const isDemo = process.env.NEXT_PUBLIC_DEMO !== 'false';
export const bookingMode: 'demo' | 'api' = process.env.NEXT_PUBLIC_BOOKING_MODE === 'api' ? 'api' : 'demo';
export const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || '';
