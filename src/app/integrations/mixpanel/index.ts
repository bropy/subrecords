import { mixpanel } from './mixpanel.client'

// Analytics utilities for tracking user interactions
export { mixpanel } from './mixpanel.client'
export { MixpanelProvider } from './mixpanel.provider'

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    mixpanel.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    })
  }
}

export const identifyUser = (userId: string, userProperties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    mixpanel.identify(userId)
    if (userProperties) {
      mixpanel.people.set(userProperties)
    }
  }
}

export const trackPageView = (pageName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    mixpanel.track('Page View', {
      page: pageName,
      ...properties,
      timestamp: new Date().toISOString()
    })
  }
}

