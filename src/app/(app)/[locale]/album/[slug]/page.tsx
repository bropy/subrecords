import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from 'next-intl'
import { notFound } from 'next/navigation'

import { getQueryClient, albumBySlugQueryOptions, fetchTopAlbums } from '@/pkg/libraries/rest-api'
import { AlbumModule } from '@/app/modules'
import { routing } from '@/pkg/libraries/locale/routing'

// interface
interface IProps {
  params: Promise<{ slug: string; locale: Locale }>
}

export const revalidate = 300 // 5 minutes

export async function generateStaticParams() {
  try {
    const albums = await fetchTopAlbums()
    const locales = routing.locales

    return locales.flatMap((locale) =>
      albums.map((album) => ({
        locale,
        slug: album.slug,
      }))
    )
  } catch (error) {
    console.error('Error generating static params for albums:', error)
    return []
  }
}

// component
export default async function AlbumPage(props: Readonly<IProps>) {
  const { params } = props
  const { slug, locale } = await params

  setRequestLocale(locale)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(albumBySlugQueryOptions(slug))

  const album = queryClient.getQueryData(albumBySlugQueryOptions(slug).queryKey)

  if (!album) {
    notFound()
  }

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumModule slug={slug} />
    </HydrationBoundary>
  )
}

