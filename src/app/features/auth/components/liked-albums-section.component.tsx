'use client'

import { useEffect } from 'react'
import { Heart, Music, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLikesStore } from '@/app/shared/store/likes.store'
import { useAuthStore } from '@/app/shared/store/auth.store'

export const LikedAlbumsSection = () => {
  const t = useTranslations('likedAlbums')
  const { likes, isLoading, fetchUserLikes } = useLikesStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserLikes()
    }
  }, [isAuthenticated, fetchUserLikes])

  if (!isAuthenticated) {
    return (
      <div className="bg-netflix-dark-gray p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <Heart className="w-12 h-12 text-netflix-text-gray mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-netflix-white mb-2">
            {t('sign_in_title')}
          </h3>
          <p className="text-netflix-text-gray">
            {t('sign_in_subtitle')}
          </p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-netflix-dark-gray p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-netflix-red" />
          <h3 className="text-lg font-semibold text-netflix-white">{t('title')}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-netflix-light-gray rounded-lg mb-2"></div>
              <div className="h-4 bg-netflix-light-gray rounded mb-1"></div>
              <div className="h-3 bg-netflix-light-gray rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (likes.length === 0) {
    return (
      <div className="bg-netflix-dark-gray p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <Heart className="w-12 h-12 text-netflix-text-gray mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-netflix-white mb-2">
            {t('empty_title')}
          </h3>
          <p className="text-netflix-text-gray">
            {t('empty_subtitle')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-netflix-dark-gray p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-netflix-red" />
        <h3 className="text-lg font-semibold text-netflix-white">{t('title')}</h3>
        <span className="text-netflix-text-gray text-sm">({likes.length})</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likes.map((like) => (
          <div key={like.id} className="group">
            <div className="relative aspect-square bg-netflix-light-gray rounded-lg overflow-hidden mb-3">
              {like.album_image_url ? (
                <img 
                  src={like.album_image_url} 
                  alt={like.album_name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-netflix-light-gray to-netflix-black">
                  <Music className="w-8 h-8 text-netflix-text-gray" />
                </div>
              )}
              
              <div className="absolute top-2 right-2">
                <Heart className="w-4 h-4 text-netflix-red fill-netflix-red" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-netflix-white text-sm leading-tight line-clamp-2">
                {like.album_name}
              </h4>
              <p className="text-xs text-netflix-text-gray line-clamp-1">
                {like.artist_name}
              </p>
              <div className="flex items-center gap-1 text-xs text-netflix-text-gray">
                <Calendar className="w-3 h-3" />
                <span>{new Date(like.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
