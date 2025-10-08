'use client'

import { useEffect } from 'react'
import { Heart, Music, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
      <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
        <div className="text-center">
          <Heart className="w-12 h-12 text-beige-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-beige-100 mb-2">
            {t('sign_in_title')}
          </h3>
          <p className="text-beige-400">
            {t('sign_in_subtitle')}
          </p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-beige-100">{t('title')}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-dark-blue-gray rounded-lg mb-2"></div>
              <div className="h-4 bg-dark-blue-gray rounded mb-1"></div>
              <div className="h-3 bg-dark-blue-gray rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (likes.length === 0) {
    return (
      <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
        <div className="text-center">
          <Heart className="w-12 h-12 text-beige-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-beige-100 mb-2">
            {t('empty_title')}
          </h3>
          <p className="text-beige-400">
            {t('empty_subtitle')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-red-500" />
        <h3 className="text-lg font-semibold text-beige-100">{t('title')}</h3>
        <span className="text-beige-400 text-sm">({likes.length})</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likes.map((like) => (
          <div key={like.id} className="group">
            <div className="relative aspect-square bg-dark-blue-gray rounded-lg overflow-hidden mb-3">
              {like.album_image_url ? (
                <Image 
                  src={like.album_image_url} 
                  alt={like.album_name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-blue-gray to-dark-blue">
                  <Music className="w-8 h-8 text-beige-400" />
                </div>
              )}
              
              <div className="absolute top-2 right-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-beige-100 text-sm leading-tight line-clamp-2">
                {like.album_name}
              </h4>
              <p className="text-xs text-beige-400 line-clamp-1">
                {like.artist_name}
              </p>
              <div className="flex items-center gap-1 text-xs text-beige-400">
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
