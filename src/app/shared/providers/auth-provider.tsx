'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/app/shared/store/auth.store'
import { useLikesStore } from '@/app/shared/store/likes.store'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialize = useAuthStore((state) => state.initialize)
  const fetchUserLikes = useLikesStore((state) => state.fetchUserLikes)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserLikes()
    }
  }, [isAuthenticated, fetchUserLikes])

  return <>{children}</>
}
