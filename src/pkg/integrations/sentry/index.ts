'use client'

import * as Sentry from '@sentry/nextjs'

export const captureError = (error: Error, context?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    console.log('🔴 Sentry: Capturing error', error, context)
    const eventId = Sentry.captureException(error, {
      extra: context,
    })
    console.log('📤 Sentry: Event ID', eventId)
    return eventId
  }
  return null
}

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window !== 'undefined') {
    console.log('📨 Sentry: Capturing message', message, level)
    const eventId = Sentry.captureMessage(message, level)
    console.log('📤 Sentry: Event ID', eventId)
    return eventId
  }
  return null
}

export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  if (typeof window !== 'undefined') {
    console.log('👤 Sentry: Setting user context', user)
    Sentry.setUser(user)
  }
}

export { Sentry }

