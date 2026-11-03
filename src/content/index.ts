import { en } from './en';
import { pt, type Dictionary } from './pt';
import type { Locale } from './routes';

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
