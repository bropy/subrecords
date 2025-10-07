'use client'

import { Music, Clock, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'

import { lastFmKeys } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'

const TopAlbumsSection = () => {
  const t = useTranslations('topAlbums')
  
  // Use the same query key as server-side prefetch
  // This will use the prefetched data from the server
  const { data: albums, isLoading, error } = useQuery({
    queryKey: lastFmKeys.allTopAlbums(),
    queryFn: () => lastFmService.getAllTopAlbums(),
    staleTime: Infinity, // Data never becomes stale - use cached data indefinitely
    gcTime: Infinity, // Keep in cache forever
    refetchInterval: false, // Disable automatic refetching
    refetchIntervalInBackground: false, // Disable background refetching
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnReconnect: false, // Don't refetch when reconnecting to internet
    retry: 1, // Reduce retries to minimize requests
    retryDelay: 5000, // Wait 5 seconds before retry
  })

  if (isLoading) {
    return (
      <section className="py-20 bg-netflix-dark-gray">
        <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-netflix-white mb-4">
            {t('title')}
          </h2>
          <p className="text-netflix-text-gray text-lg">
            {t('subtitle')}
          </p>
        </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-netflix-light-gray rounded-lg mb-3"></div>
                <div className="h-4 bg-netflix-light-gray rounded mb-2"></div>
                <div className="h-3 bg-netflix-light-gray rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-netflix-dark-gray">
        <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-netflix-white mb-4">
            {t('title')}
          </h2>
          <p className="text-netflix-text-gray">
            {t('error')}
          </p>
        </div>
        </div>
      </section>
    )
  }

  const albumsList = albums || []

  return (
    <section className="py-20 bg-netflix-dark-gray">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-netflix-white mb-4">
            {t('title')}
          </h2>
          
          <p className="text-netflix-text-gray text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {albumsList.map((album, index) => {
            const largeImage = album.image.find(img => img.size === 'large')?.['#text'] || 
                             album.image.find(img => img.size === 'medium')?.['#text'] || 
                             album.image[0]?.['#text']
            
            return (
              <div 
                key={`${album.mbid}-${index}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square bg-netflix-light-gray rounded-lg overflow-hidden mb-3 transition-transform group-hover:scale-105">
                  {largeImage ? (
                    <img 
                      src={largeImage} 
                      alt={album.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-netflix-light-gray to-netflix-black">
                      <Music className="w-12 h-12 text-netflix-text-gray" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-6 h-6 text-netflix-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-netflix-white text-sm leading-tight line-clamp-2 group-hover:text-netflix-red transition-colors">
                    {album.name}
                  </h3>
                  
                  <p className="text-xs text-netflix-text-gray line-clamp-1">
                    {'artist' in album ? String(album.artist) : 'Unknown Artist'}
                  </p>
                  
                </div>
              </div>
            )
          })}
        </div>

        {albumsList.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-netflix-light-gray/20 rounded-lg px-6 py-4">
              <div className="flex items-center gap-2 text-netflix-text-gray">
                <Music className="w-4 h-4" />
                <span className="text-sm">{albumsList.length} {t('albums_count')}</span>
              </div>
              <div className="flex items-center gap-2 text-netflix-text-gray">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{t('updated_every')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TopAlbumsSection
