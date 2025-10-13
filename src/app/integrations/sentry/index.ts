import { Sentry } from './sentry.client'

// Error tracking utilities
export { Sentry } from './sentry.client'
export { SentryProvider } from './sentry.provider'

// Common error tracking functions
export const captureException = (error: Error, context?: Record<string, string | number | boolean>) => {
  Sentry.captureException(error, {
    tags: context,
    level: 'error'
  })
}

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.captureMessage(message, level)
}

export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user)
}

export const addBreadcrumb = (message: string, category?: string, level?: 'info' | 'warning' | 'error') => {
  Sentry.addBreadcrumb({
    message,
    category: category || 'user',
    level: level || 'info',
    timestamp: Date.now() / 1000
  })
}

