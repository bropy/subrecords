import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_CLIENT_WEB_URL: z
      .string()
      .min(1, { message: 'NEXT_PUBLIC_CLIENT_WEB_URL is required' }),
    NEXT_PUBLIC_CLIENT_API_URL: z
      .string()
      .min(1, { message: 'NEXT_PUBLIC_CLIENT_API_URL is required' }),
    NEXT_PUBLIC_LASTFM_API_KEY: z
      .string()
      .min(1, { message: 'NEXT_PUBLIC_LASTFM_API_KEY is required' }),
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .min(1, { message: 'NEXT_PUBLIC_SUPABASE_URL is required' }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1, { message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required' }),
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z
      .string()
      .optional()
      .default('https://cdn.growthbook.io'),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z
      .string()
      .optional()
      .default('demo'),
    NEXT_PUBLIC_MIXPANEL_TOKEN: z
      .string()
      .optional()
      .default('demo-token'),
    NEXT_PUBLIC_SENTRY_DSN: z
      .string()
      .optional()
      .default('https://demo@sentry.io/demo'),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    NEXT_PUBLIC_LASTFM_API_KEY: process.env.NEXT_PUBLIC_LASTFM_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
});
