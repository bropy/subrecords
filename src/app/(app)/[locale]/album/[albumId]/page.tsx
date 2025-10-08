import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { lastFmKeys } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'
import { AlbumDetailClient } from '@/app/(app)/[locale]/album/[albumId]/album-detail-client'

interface IProps {
  params: Promise<{ locale: Locale; albumId: string }>
}

// Generate static params for popular albums
export async function generateStaticParams() {
  try {
    // Get top albums to pre-render
    const albums = await lastFmService.getAllTopAlbums()
    
    // Return params for each album
    return albums.map((album) => ({
      albumId: album.mbid || album.name,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 300 // Revalidate every 5 minutes

const AlbumDetailPage: FC<Readonly<IProps>> = async (props) => {
  const { locale, albumId } = await props.params
  setRequestLocale(locale)

  // Create a new QueryClient for server-side prefetching
  const queryClient = new QueryClient()

  // Prefetch album detail data on the server
  await queryClient.prefetchQuery({
    queryKey: lastFmKeys.albumDetail(albumId),
    queryFn: () => lastFmService.getAlbumDetail(albumId),
    staleTime: Infinity, // Never refetch on client
    gcTime: Infinity, // Keep in cache forever
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumDetailClient albumId={albumId} />
    </HydrationBoundary>
  )
}

export default AlbumDetailPage
