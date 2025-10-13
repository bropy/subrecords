'use client'

import { useEffect } from 'react'
import { mixpanel } from './mixpanel.client'

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track page view on mount
    mixpanel.track('Page View', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  }, [])

  return <>{children}</>
}

