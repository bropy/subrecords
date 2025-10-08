'use client'

import { useEffect } from 'react'
import { Sentry } from './sentry.client'

export function SentryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set user context if available
    Sentry.setContext('app', {
      name: 'SubMusic',
      version: '1.0.0'
    })
  }, [])

  return <>{children}</>
}
