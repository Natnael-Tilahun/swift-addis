'use server';

import {cookies} from 'next/headers';
import {locales, defaultLocale} from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  console.log(cookies().get(COOKIE_NAME)?.value);
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: typeof locales[number]) {
  cookies().set(COOKIE_NAME, locale);
}
