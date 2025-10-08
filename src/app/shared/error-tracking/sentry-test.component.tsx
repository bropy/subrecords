'use client'

import { captureException, captureMessage, addBreadcrumb } from '@/app/shared/error-tracking'

export function SentryTest() {
  const handleTestException = () => {
    try {
      throw new Error('Test exception for Sentry error tracking')
    } catch (error) {
      console.error('Test exception:', error)
      captureException(error as Error, {
        test_type: 'manual',
        component: 'SentryTest'
      })
      alert('Test exception sent to Sentry!')
    }
  }

  const handleTestMessage = () => {
    captureMessage('Test message for Sentry', 'info')
    alert('Test message sent to Sentry!')
  }

  const handleTestBreadcrumb = () => {
    addBreadcrumb('Test breadcrumb added', 'test', 'info')
    alert('Test breadcrumb added to Sentry!')
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Sentry Error Tracking Test</h3>
      <div className="space-y-2">
        <button
          onClick={handleTestException}
          className="block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Send Test Exception
        </button>
        <button
          onClick={handleTestMessage}
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Test Message
        </button>
        <button
          onClick={handleTestBreadcrumb}
          className="block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Test Breadcrumb
        </button>
      </div>
    </div>
  )
}
