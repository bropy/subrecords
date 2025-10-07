import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config/localization/config';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  try {
    const messages = (await import(`./translations/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch {
    notFound();
  }
});
