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

// interface
interface IProps {
  albumId: string
}

// component
export const AlbumDetailModule: FC<Readonly<IProps>> = ({ albumId }) => {
  const t = useTranslations('albumDetail')
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { likeAlbum, unlikeAlbum, isAlbumLiked } = useLikesStore()

  const { data: album, error } = useQuery({
    queryKey: lastFmKeys.albumDetail(albumId),
    queryFn: () => lastFmService.getAlbumDetail(albumId),
    staleTime: Infinity,
    gcTime: Infinity,
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

  if (error || !album) {
    return (
      <div className="min-h-screen bg-dark-blue">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-beige-100 mb-4">
              {t('not_found_title')}
            </h1>
            <p className="text-beige-400 mb-8">
              {t('not_found_subtitle')}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
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

  // return
  return (
    <div className="min-h-screen bg-dark-blue">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-beige-400 hover:text-beige-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="relative aspect-square bg-dark-blue-gray rounded-lg overflow-hidden">
              {largeImage ? (
                <img 
                  src={largeImage} 
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-blue-gray to-dark-blue">
                  <Music className="w-16 h-16 text-beige-400" />
                </div>
              )}
              
              {isAuthenticated && (
                <button
                  onClick={handleLikeToggle}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isAlbumLiked(album.mbid || album.name)
                      ? 'bg-red-600 text-white'
                      : 'bg-black/50 text-white hover:bg-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isAlbumLiked(album.mbid || album.name) ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-beige-100 mb-2">
                  {album.name}
                </h1>
                <p className="text-xl text-beige-400">
                  by {album.artist?.name || 'Unknown Artist'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-blue-light p-4 rounded-lg border border-dark-blue-gray">
                  <div className="flex items-center gap-2 text-beige-400 mb-1">
                    <Music className="w-4 h-4" />
                    <span className="text-sm">{t('tracks')}</span>
                  </div>
                  <p className="text-beige-100 font-semibold">
                    {Array.isArray(album.tracks?.track) ? album.tracks.track.length : (album.tracks?.track ? 1 : 0)}
                  </p>
                </div>
                
                <div className="bg-dark-blue-light p-4 rounded-lg border border-dark-blue-gray">
                  <div className="flex items-center gap-2 text-beige-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{t('released')}</span>
                  </div>
                  <p className="text-beige-100 font-semibold">
                    {album.wiki?.published || 'Unknown'}
                  </p>
                </div>

                <div className="bg-dark-blue-light p-4 rounded-lg border border-dark-blue-gray">
                  <div className="flex items-center gap-2 text-beige-400 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{t('listeners')}</span>
                  </div>
                  <p className="text-beige-100 font-semibold">
                    {album.listeners || '0'}
                  </p>
                </div>

                <div className="bg-dark-blue-light p-4 rounded-lg border border-dark-blue-gray">
                  <div className="flex items-center gap-2 text-beige-400 mb-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{t('play_count')}</span>
                  </div>
                  <p className="text-beige-100 font-semibold">
                    {album.playcount || '0'}
                  </p>
                </div>
              </div>

              {album.wiki?.summary && (
                <div className="bg-dark-blue-light p-6 rounded-lg border border-dark-blue-gray">
                  <h3 className="text-lg font-semibold text-beige-100 mb-3">
                    {t('about_album')}
                  </h3>
                  <p className="text-beige-300 leading-relaxed">
                    {album.wiki.summary.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
              )}

              {album.tracks?.track && (
                <div className="bg-dark-blue-light p-6 rounded-lg border border-dark-blue-gray">
                  <h3 className="text-lg font-semibold text-beige-100 mb-4">
                    {t('track_list')}
                  </h3>
                  <div className="space-y-2">
                    {Array.isArray(album.tracks.track) ? (
                      album.tracks.track.map((track: { name: string; duration: string; '@attr': { rank: string } }, index: number) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-beige-800/20 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <span className="text-beige-400 text-sm w-8">
                              {track['@attr']?.rank || index + 1}
                            </span>
                            <span className="text-beige-100">{track.name}</span>
                          </div>
                          <span className="text-beige-400 text-sm">
                            {track.duration ? `${Math.floor(Number(track.duration) / 60)}:${(Number(track.duration) % 60).toString().padStart(2, '0')}` : '--:--'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-beige-400 text-sm w-8">1</span>
                          <span className="text-beige-100">{album.tracks.track.name}</span>
                        </div>
                        <span className="text-beige-400 text-sm">
                          {album.tracks.track.duration ? `${Math.floor(Number(album.tracks.track.duration) / 60)}:${(Number(album.tracks.track.duration) % 60).toString().padStart(2, '0')}` : '--:--'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <a
                  href={album.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
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
