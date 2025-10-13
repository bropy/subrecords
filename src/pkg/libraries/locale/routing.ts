import { defineRouting } from "next-intl/routing";

// routing
export const routing = defineRouting({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
    localeDetection: false,
})