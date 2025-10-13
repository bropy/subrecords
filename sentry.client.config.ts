import * as Sentry from '@sentry/nextjs'

import { envClient } from '@/config/env'

const dsn = envClient.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn: dsn,
    
    tracesSampleRate: 1.0,
    
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    debug: true,

    environment: process.env.NODE_ENV || 'development',
    
    beforeSend(event) {
      console.log('📤 Sentry: Sending event', event)
      return event
    },
  })
  
  console.log('✅ Sentry initialized with DSN:', dsn.substring(0, 20) + '...')
} else {
  console.warn('⚠️ Sentry DSN not found - Sentry will not be initialized')
}

