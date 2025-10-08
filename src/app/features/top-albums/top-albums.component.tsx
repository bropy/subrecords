'use client'

import { Music, Clock, ExternalLink, Heart } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { lastFmKeys } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'
import { useLikesStore } from '@/app/shared/store/likes.store'
import { useAuthStore } from '@/app/shared/store/auth.store'

const TopAlbumsSection = () => {
  const t = useTranslations('topAlbums')
  const locale = useLocale()
  const { isAuthenticated } = useAuthStore()
  const { likeAlbum, unlikeAlbum, isAlbumLiked, fetchUserLikes } = useLikesStore()
  const [likingAlbum, setLikingAlbum] = useState<string | null>(null)

  const { data: albums, isLoading } = useQuery({
    queryKey: lastFmKeys.allTopAlbums(),
    queryFn: () => lastFmService.getAllTopAlbums(),
    staleTime: Infinity, 
    gcTime: Infinity, 
    refetchInterval: false, 
    refetchIntervalInBackground: false, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false, 
    retry: 1, 
    retryDelay: 5000, 
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserLikes()
    }
  }, [isAuthenticated, fetchUserLikes])

  const handleLikeToggle = async (album: { mbid?: string; name: string; artist?: string; image: Array<{ size: string; '#text': string }> }) => {
    if (!isAuthenticated) {
      alert('Please sign in to like albums')
      return
    }

    const albumMbid = album.mbid || album.name 
    const isLiked = isAlbumLiked(albumMbid)
    
    setLikingAlbum(albumMbid)

    try {
      if (isLiked) {
        await unlikeAlbum(albumMbid)
      } else {
        const albumData = {
          album_mbid: albumMbid,
          album_name: album.name,
          artist_name: 'artist' in album ? String(album.artist) : 'Unknown Artist',
          album_image_url: album.image.find((img: { size: string; '#text': string }) => img.size === 'large')?.['#text'] || 
                          album.image.find((img: { size: string; '#text': string }) => img.size === 'medium')?.['#text'] || 
                          album.image[0]?.['#text']
        }
        await likeAlbum(albumData)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setLikingAlbum(null)
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-dark-blue-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-beige-100 mb-6">
              {t('title')}
            </h2>
            <p className="text-beige-300 text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-dark-blue-gray rounded-xl mb-4"></div>
                <div className="h-4 bg-dark-blue-gray rounded mb-2"></div>
                <div className="h-3 bg-dark-blue-gray rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }


  const albumsList = albums || []

  return (
    <section className="py-20 bg-dark-blue-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-beige-100 mb-6">
            {t('title')}
          </h2>
          
          <p className="text-beige-300 text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {albumsList.map((album, index) => {
            const largeImage = album.image.find(img => img.size === 'large')?.['#text'] || 
                             album.image.find(img => img.size === 'medium')?.['#text'] || 
                             album.image[0]?.['#text']
            
            return (
              <Link 
                key={`${album.mbid}-${index}`}
                href={`/${locale}/album/${album.mbid || album.name}`}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-square bg-dark-blue-gray rounded-xl overflow-hidden mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  {largeImage ? (
                    <Image 
                      src={largeImage} 
                      alt={album.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-dark-blue-gray">
                      <Music className="w-12 h-12 text-beige-400" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                      <ExternalLink className="w-6 h-6 text-beige-100" />
                      
                      {/* Like Button */}
                      {isAuthenticated && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleLikeToggle(album)
                          }}
                          disabled={likingAlbum === (album.mbid || album.name)}
                          className={`w-6 h-6 transition-colors ${
                            isAlbumLiked(album.mbid || album.name)
                              ? 'text-red-500 fill-red-500'
                              : 'text-beige-100 hover:text-red-500'
                          } ${likingAlbum === (album.mbid || album.name) ? 'opacity-50' : ''}`}
                        >
                          <Heart className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-beige-100 text-sm leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                    {album.name}
                  </h3>
                  
                  <p className="text-xs text-beige-400 line-clamp-1">
                    {'artist' in album ? String(album.artist) : 'Unknown Artist'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {albumsList.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-dark-blue-gray/50 rounded-xl px-8 py-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-beige-400">
                <Music className="w-5 h-5" />
                <span className="text-sm font-medium">{albumsList.length} {t('albums_count')}</span>
              </div>
              <div className="flex items-center gap-3 text-beige-400">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">{t('updated_every')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TopAlbumsSection
