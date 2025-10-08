'use client'

import { useAuthStore } from '@/app/shared/store/auth.store'
import { useLikesStore } from '@/app/shared/store/likes.store'

export const AuthDebug = () => {
  const { user, userProfile, isAuthenticated, isLoading } = useAuthStore()
  const { likes, isLoading: likesLoading } = useLikesStore()

  return (
    <div className="bg-netflix-dark-gray p-4 rounded-lg text-xs text-netflix-white">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div className="space-y-1">
        <div>Auth Loading: {isLoading ? 'Yes' : 'No'}</div>
        <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>User: {user?.email || 'None'}</div>
        <div>Profile: {userProfile?.email || 'None'}</div>
        <div>Likes Loading: {likesLoading ? 'Yes' : 'No'}</div>
        <div>Likes Count: {likes.length}</div>
      </div>
    </div>
  )
}
