'use client'

import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
if (typeof window !== 'undefined') {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'demo-token', {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  })
}

export { mixpanel }

