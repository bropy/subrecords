'use client'

import * as Sentry from '@sentry/nextjs'

// Initialize Sentry
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://demo@sentry.io/demo',
  environment: process.env.NODE_ENV || 'development',
  debug: process.env.NODE_ENV === 'development',
  tracesSampleRate: 1.0,
})

export { Sentry }

