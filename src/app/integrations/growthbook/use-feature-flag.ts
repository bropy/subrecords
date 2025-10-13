'use client'

import { useFeature } from '@growthbook/growthbook-react'
import { FeatureFlagKey } from './types'

export function useFeatureFlag(key: FeatureFlagKey, defaultValue: boolean = false): boolean {
  const { value } = useFeature(key)
  return value ?? defaultValue
}

