'use client'

import { User, Calendar, Mail } from 'lucide-react'
import { useAuthStore } from '@/app/shared/store/auth.store'

// component
export const UserProfileCard = () => {
  const { userProfile, isAuthenticated } = useAuthStore()

  if (!isAuthenticated || !userProfile) {
    return null
  }

  // return
  return (
    <div className="bg-netflix-dark-gray p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-netflix-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-netflix-white">User Profile</h3>
          <p className="text-netflix-text-gray text-sm">Database Record</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-netflix-text-gray" />
          <div>
            <p className="text-sm text-netflix-text-gray">Email</p>
            <p className="text-netflix-white">{userProfile.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-netflix-text-gray" />
          <div>
            <p className="text-sm text-netflix-text-gray">Member Since</p>
            <p className="text-netflix-white">
              {new Date(userProfile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-netflix-text-gray" />
          <div>
            <p className="text-sm text-netflix-text-gray">User ID</p>
            <p className="text-netflix-white font-mono text-xs">
              {userProfile.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
