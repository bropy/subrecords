'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { Link } from '@/pkg/libraries/locale/navigation'
import Image from 'next/image'

import { topAlbumsQueryOptions } from '@/pkg/libraries/rest-api'
import { trackEvent } from '@/pkg/integrations/mixpanel'

// component
const AlbumsSectionComponent: FC = () => {
  const t = useTranslations('home.albums')
  const { data: albums, isLoading } = useQuery(topAlbumsQueryOptions())

  const handleAlbumClick = (albumName: string, artistName: string) => {
    trackEvent('Album Clicked', {
      album_name: albumName,
      artist_name: artistName,
      section: 'Top Albums',
    })
  }

  // return
  return (
    <section className='bg-gradient-to-b from-black via-red-950/10 to-black py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            {t('title')} <span className='text-red-600'>{t('title_highlight')}</span>
          </h2>
          <p className='text-gray-400 text-lg'>{t('subtitle')}</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} className='bg-red-950/20 border border-red-600/10'>
                  <CardBody className='p-0'>
                    <Skeleton className='rounded-lg w-full aspect-square' />
                  </CardBody>
                  <CardFooter className='flex-col items-start gap-2 p-4'>
                    <Skeleton className='h-4 w-3/4 rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                  </CardFooter>
                </Card>
              ))
            : albums?.map((album) => (
                <Link
                  key={album.collectionId}
                  href={`/album/${album.slug}`}
                  onClick={() => handleAlbumClick(album.collectionName, album.artistName)}
                >
                  <Card className='bg-gradient-to-br from-red-950/30 to-black/80 border border-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:scale-105 cursor-pointer group'>
                    <CardBody className='p-0 overflow-hidden'>
                      <Image
                        src={album.artworkUrl100.replace('100x100', '600x600')}
                        alt={album.collectionName}
                        width={300}
                        height={300}
                        className='w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                    </CardBody>
                    <CardFooter className='flex-col items-start gap-1 p-4'>
                      <h3 className='text-white font-bold text-sm line-clamp-2 group-hover:text-red-600 transition-colors'>
                        {album.collectionName}
                      </h3>
                      <p className='text-gray-400 text-xs'>{album.artistName}</p>
                      <p className='text-red-600 text-xs mt-1'>{album.primaryGenreName}</p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </section>
  )
}

export default AlbumsSectionComponent

