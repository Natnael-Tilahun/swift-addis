export type locale = (typeof locales)[number];

export const locales = ['en', 'am'] as const;
export const defaultLocale = 'en' as const;