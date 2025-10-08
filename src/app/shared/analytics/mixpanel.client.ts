'use client'

import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'

// Initialize Mixpanel
if (typeof window !== 'undefined') {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'demo-token', {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
    record_sessions_percent: 1,
    record_heatmap_data: true,
  })
}

export { mixpanel }
