import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional().default('development'),
    DATABASE_URL: z.string().optional().default(''),
    GROWTHBOOK_API_HOST: z.string().optional().default('https://cdn.growthbook.io'),
    GROWTHBOOK_CLIENT_KEY: z.string().optional().default('sdk-demo'),
    SENTRY_DSN: z.string().optional().default(''),
    SENTRY_AUTH_TOKEN: z.string().optional().default(''),
    MIXPANEL_TOKEN: z.string().optional().default('demo-token'),
    MIXPANEL_PROJECT_ID: z.string().optional().default(''),
    PLAYWRIGHT_BASE_URL: z.string().optional().default('http://localhost:3000'),
    PLAYWRIGHT_HEADLESS: z.string().optional().default('true'),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    GROWTHBOOK_API_HOST: process.env.GROWTHBOOK_API_HOST,
    GROWTHBOOK_CLIENT_KEY: process.env.GROWTHBOOK_CLIENT_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
    MIXPANEL_PROJECT_ID: process.env.MIXPANEL_PROJECT_ID,
    PLAYWRIGHT_BASE_URL: process.env.PLAYWRIGHT_BASE_URL,
    PLAYWRIGHT_HEADLESS: process.env.PLAYWRIGHT_HEADLESS,
  },
})
