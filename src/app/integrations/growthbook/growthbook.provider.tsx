'use client'

import { GrowthBook, GrowthBookProvider as GBProvider } from '@growthbook/growthbook-react'
import { useEffect } from 'react'

const growthbook = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io',
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || 'demo',
  enableDevMode: process.env.NODE_ENV === 'development',
})

export function GrowthBookProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load feature flags
    growthbook.loadFeatures()
      .then(() => {
        console.log('GrowthBook features loaded successfully')
      })
      .catch((error) => {
        console.error('Failed to load GrowthBook features:', error)
        // Set a default feature flag for demo purposes
        growthbook.setFeatures({
          'button-on-hero': {
            defaultValue: true,
            rules: []
          }
        })
        console.log('Using fallback feature flags')
      })
  }, [])

  return (
    <GBProvider growthbook={growthbook}>
      {children}
    </GBProvider>
  )
}

