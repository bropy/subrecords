import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from 'next-intl'
import { notFound } from 'next/navigation'

import { getQueryClient, albumBySlugQueryOptions } from '@/pkg/libraries/rest-api'
import { AlbumModule } from '@/app/modules'

// interface
interface IProps {
  params: Promise<{ slug: string; locale: Locale }>
}

export const revalidate = 300 // 5 minutes

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

