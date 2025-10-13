'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Link } from '@/pkg/libraries/locale/navigation'
import Image from 'next/image'

import { useViewedAlbumsStore } from '@/app/shared/store'

// component
const ViewedAlbumsSectionComponent: FC = () => {
  const t = useTranslations('home.viewed')
  const viewedAlbums = useViewedAlbumsStore((state) => state.viewedAlbums)

  if (!viewedAlbums || viewedAlbums.length === 0) return null

  // return
  return (
    <section className='bg-black border-t border-red-600/20 py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-white'>
            {t('title')} <span className='text-red-600'>👁️</span>
          </h2>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {viewedAlbums.map((album) => (
            <Link key={album.collectionId} href={`/album/${album.slug}`}>
              <Card className='bg-gradient-to-br from-red-950/20 to-black/80 border border-red-600/10 hover:border-red-600/30 transition-all duration-300 hover:scale-105 cursor-pointer group'>
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
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ViewedAlbumsSectionComponent

