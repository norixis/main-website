import type { Locale } from '@/lib/i18n';
import en from './en';
import nl from './nl';

const dictionaries = {
  en,
  nl,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];

export type Dictionary = (typeof dictionaries)[Locale];
