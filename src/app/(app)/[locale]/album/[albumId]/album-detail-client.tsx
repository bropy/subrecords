'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { ArrowLeft, Heart, Music, Calendar, User, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { lastFmKeys } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'
import { useLikesStore } from '@/app/shared/store/likes.store'
import { useAuthStore } from '@/app/shared/store/auth.store'

interface IProps {
  albumId: string
}

export const AlbumDetailClient: FC<Readonly<IProps>> = ({ albumId }) => {
  const t = useTranslations('albumDetail')
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { likeAlbum, unlikeAlbum, isAlbumLiked } = useLikesStore()

  // Fetch album details (data is prefetched on server)
  const { data: album, isLoading, error } = useQuery({
    queryKey: lastFmKeys.albumDetail(albumId),
    queryFn: () => lastFmService.getAlbumDetail(albumId),
    staleTime: Infinity, // Never refetch
    gcTime: Infinity, // Keep in cache forever
  })

  const handleLikeToggle = async () => {
    if (!isAuthenticated || !album) return

    const albumData = {
      album_mbid: album.mbid || album.name,
      album_name: album.name,
      artist_name: album.artist?.name || 'Unknown Artist',
      album_image_url: album.image?.find((img: { size: string; '#text': string }) => img.size === 'large')?.['#text']
    }

    if (isAlbumLiked(albumData.album_mbid)) {
      await unlikeAlbum(albumData.album_mbid)
    } else {
      await likeAlbum(albumData)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-netflix-light-gray rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="aspect-square bg-netflix-light-gray rounded-lg"></div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-netflix-light-gray rounded w-3/4"></div>
                <div className="h-4 bg-netflix-light-gray rounded w-1/2"></div>
                <div className="h-4 bg-netflix-light-gray rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !album) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-netflix-white mb-4">
              {t('not_found_title')}
            </h1>
            <p className="text-netflix-text-gray mb-8">
              {t('not_found_subtitle')}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-netflix-red hover:bg-red-700 text-netflix-white px-6 py-3 rounded-lg transition-colors"
            >
              {t('go_back')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const largeImage = album.image?.find((img: { size: string; '#text': string }) => img.size === 'large')?.['#text'] ||
                    album.image?.find((img: { size: string; '#text': string }) => img.size === 'medium')?.['#text'] ||
                    album.image?.[0]?.['#text']

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-netflix-text-gray hover:text-netflix-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Album Art */}
          <div className="lg:col-span-1">
            <div className="relative aspect-square bg-netflix-light-gray rounded-lg overflow-hidden">
              {largeImage ? (
                <img 
                  src={largeImage} 
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-netflix-light-gray to-netflix-black">
                  <Music className="w-16 h-16 text-netflix-text-gray" />
                </div>
              )}
              
              {/* Like Button */}
              {isAuthenticated && (
                <button
                  onClick={handleLikeToggle}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isAlbumLiked(album.mbid || album.name)
                      ? 'bg-netflix-red text-netflix-white'
                      : 'bg-black/50 text-netflix-white hover:bg-netflix-red'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isAlbumLiked(album.mbid || album.name) ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Album Info */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title and Artist */}
              <div>
                <h1 className="text-4xl font-bold text-netflix-white mb-2">
                  {album.name}
                </h1>
                <p className="text-xl text-netflix-text-gray">
                  by {album.artist?.name || 'Unknown Artist'}
                </p>
              </div>

              {/* Album Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-netflix-dark-gray p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-netflix-text-gray mb-1">
                    <Music className="w-4 h-4" />
                    <span className="text-sm">{t('tracks')}</span>
                  </div>
                  <p className="text-netflix-white font-semibold">
                    {Array.isArray(album.tracks?.track) ? album.tracks.track.length : (album.tracks?.track ? 1 : 0)}
                  </p>
                </div>
                
                <div className="bg-netflix-dark-gray p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-netflix-text-gray mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{t('released')}</span>
                  </div>
                  <p className="text-netflix-white font-semibold">
                    {album.wiki?.published || 'Unknown'}
                  </p>
                </div>

                <div className="bg-netflix-dark-gray p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-netflix-text-gray mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{t('listeners')}</span>
                  </div>
                  <p className="text-netflix-white font-semibold">
                    {album.listeners || '0'}
                  </p>
                </div>

                <div className="bg-netflix-dark-gray p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-netflix-text-gray mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{t('play_count')}</span>
                  </div>
                  <p className="text-netflix-white font-semibold">
                    {album.playcount || '0'}
                  </p>
                </div>
              </div>

              {/* Album Description */}
              {album.wiki?.summary && (
                <div className="bg-netflix-dark-gray p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-netflix-white mb-3">
                    {t('about_album')}
                  </h3>
                  <p className="text-netflix-text-gray leading-relaxed">
                    {album.wiki.summary.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
              )}

              {/* Track List */}
              {album.tracks?.track && (
                <div className="bg-netflix-dark-gray p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-netflix-white mb-4">
                    {t('track_list')}
                  </h3>
                  <div className="space-y-2">
                    {Array.isArray(album.tracks.track) ? (
                      album.tracks.track.map((track: { name: string; duration: string; '@attr': { rank: string } }, index: number) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-netflix-text-gray/20 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <span className="text-netflix-text-gray text-sm w-8">
                              {track['@attr']?.rank || index + 1}
                            </span>
                            <span className="text-netflix-white">{track.name}</span>
                          </div>
                          <span className="text-netflix-text-gray text-sm">
                            {track.duration ? `${Math.floor(Number(track.duration) / 60)}:${(Number(track.duration) % 60).toString().padStart(2, '0')}` : '--:--'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-netflix-text-gray text-sm w-8">1</span>
                          <span className="text-netflix-white">{album.tracks.track.name}</span>
                        </div>
                        <span className="text-netflix-text-gray text-sm">
                          {album.tracks.track.duration ? `${Math.floor(Number(album.tracks.track.duration) / 60)}:${(Number(album.tracks.track.duration) % 60).toString().padStart(2, '0')}` : '--:--'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* External Links */}
              <div className="flex gap-4">
                <a
                  href={album.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-netflix-red hover:bg-red-700 text-netflix-white px-6 py-3 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('view_lastfm')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
