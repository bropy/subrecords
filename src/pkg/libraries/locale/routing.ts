import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
    locales: ['en', 'de'],
    localePrefix: 'as-needed',
    localeDetection: false,
    defaultLocale: 'en',
  })