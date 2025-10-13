'use client'

import { type FC, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody } from '@heroui/card'
import { Button } from '@heroui/button'
import { Link } from '@/pkg/libraries/locale/navigation'
import Image from 'next/image'

import { albumBySlugQueryOptions } from '@/pkg/libraries/rest-api'
import { useViewedAlbumsStore } from '@/app/shared/store'
import { trackEvent } from '@/pkg/integrations/mixpanel'
import { AlbumCommentForm } from './album-comment-form.component'
import { AlbumCommentsList } from './album-comments-list.component'

// interface
interface IProps {
  slug: string
}

const AlbumDetailComponent: FC<IProps> = (props) => {
  const { slug } = props

  const t = useTranslations('album')
  const { data: album } = useQuery(albumBySlugQueryOptions(slug))
  const addViewedAlbum = useViewedAlbumsStore((state) => state.addViewedAlbum)

  useEffect(() => {
    if (album) {
      addViewedAlbum(album)
      trackEvent('Album Viewed', {
        album_name: album.collectionName,
        artist_name: album.artistName,
        genre: album.primaryGenreName,
        price: album.collectionPrice,
      })
    }
  }, [album, addViewedAlbum])

  if (!album) return null

  // return
  return (
    <section className='bg-gradient-to-b from-black to-red-950/20 min-h-screen py-20 px-6'>
      <div className='max-w-5xl mx-auto'>
        <Link href='/' className='inline-flex items-center text-red-600 hover:text-red-500 mb-8 transition-colors'>
          ← {t('back_to_home')}
        </Link>

        <div className='flex flex-col md:flex-row gap-8 mb-12'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500' />
            <Card className='relative bg-gradient-to-br from-red-950/30 to-black border border-red-600/30'>
              <CardBody className='p-0'>
                <Image
                  src={album.artworkUrl100.replace('100x100', '600x600')}
                  alt={album.collectionName}
                  width={320}
                  height={320}
                  className='rounded-2xl w-full'
                  priority
                />
              </CardBody>
            </Card>
          </div>

          <div className='flex-1 space-y-6'>
            <div>
              <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
                {album.collectionName}
              </h1>
              <p className='text-2xl text-gray-300 mb-2'>{album.artistName}</p>
              <div className='flex flex-wrap gap-3 text-sm'>
                <span className='px-3 py-1 bg-red-600/20 text-red-600 rounded-full border border-red-600/30'>
                  {album.primaryGenreName}
                </span>
                <span className='px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10'>
                  {album.trackCount} {t('tracks')}
                </span>
                <span className='px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10'>
                  {new Date(album.releaseDate).getFullYear()}
                </span>
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <Button
                as='a'
                href={album.collectionViewUrl}
                target='_blank'
                size='lg'
                className='bg-red-600 hover:bg-red-700 text-white font-bold px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/50'
                radius='lg'
              >
                {t('listen_now')}
              </Button>
              <Button
                size='lg'
                variant='bordered'
                className='border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 transition-all duration-300'
                radius='lg'
              >
                {t('add_to_library')}
              </Button>
            </div>

            <div className='grid grid-cols-2 gap-4 pt-6 border-t border-red-600/20'>
              <div>
                <p className='text-gray-400 text-sm mb-1'>{t('price')}</p>
                <p className='text-white text-2xl font-bold'>
                  ${album.collectionPrice?.toFixed(2) || 'N/A'}
                </p>
              </div>
              <div>
                <p className='text-gray-400 text-sm mb-1'>{t('release_date')}</p>
                <p className='text-white text-2xl font-bold'>
                  {new Date(album.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto mt-16 space-y-12'>
          <AlbumCommentsList albumId={album.collectionId.toString()} />

          <AlbumCommentForm
            albumId={album.collectionId.toString()}
            albumName={album.collectionName}
            artistName={album.artistName}
            artworkUrl={album.artworkUrl100}
          />
        </div>
      </div>
    </section>
  )
}

export default AlbumDetailComponent

