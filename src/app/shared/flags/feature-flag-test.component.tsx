'use client'

import { useFeatureFlag } from '@/app/shared/flags'

export function FeatureFlagTest() {
  const showButton = useFeatureFlag('button-on-hero', true)
  
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Feature Flag Test</h3>
      <p className="mb-2">Button-on-hero flag status: <span className="font-mono">{showButton ? 'ON' : 'OFF'}</span></p>
      {showButton && (
        <div className="p-2 bg-green-100 text-green-800 rounded">
          ✅ More Info button should be visible
        </div>
      )}
      {!showButton && (
        <div className="p-2 bg-red-100 text-red-800 rounded">
          ❌ More Info button should be hidden
        </div>
      )}
    </div>
  )
}
