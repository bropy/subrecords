import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { lastFmKeys } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'
import { AlbumDetailModule } from '@/app/modules/album/album-detail-client.component'

// interface
interface IProps {
  params: Promise<{ locale: Locale; albumId: string }>
}

export async function generateStaticParams() {
  try {
    const albums = await lastFmService.getAllTopAlbums()
    
    return albums.map((album) => ({
      albumId: album.mbid || album.name,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export const revalidate = 300

// component
const AlbumDetailPage: FC<Readonly<IProps>> = async (props) => {
  const { locale, albumId } = await props.params
  setRequestLocale(locale)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: lastFmKeys.albumDetail(albumId),
    queryFn: () => lastFmService.getAlbumDetail(albumId),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumDetailModule albumId={albumId} />
    </HydrationBoundary>
  )
}

export default AlbumDetailPage
