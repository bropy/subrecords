'use client'

import { trackEvent, identifyUser } from '@/app/shared/analytics'

export function AnalyticsTest() {
  const handleTestEvent = () => {
    trackEvent('Test Event', {
      test_property: 'test_value',
      timestamp: new Date().toISOString()
    })
    alert('Test event sent to Mixpanel!')
  }

  const handleTestIdentify = () => {
    identifyUser('test-user-123', {
      $first_name: 'Test',
      $last_name: 'User',
      $email: 'test@example.com'
    })
    alert('User identified in Mixpanel!')
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Analytics Test</h3>
      <div className="space-y-2">
        <button
          onClick={handleTestEvent}
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Test Event
        </button>
        <button
          onClick={handleTestIdentify}
          className="block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test User Identification
        </button>
      </div>
    </div>
  )
}
