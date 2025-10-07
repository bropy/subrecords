import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import HomeModule from '@/app/modules/home/home.module'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { lastFmService } from '@/pkg/libraries/rest-api'
import { lastFmKeys } from '@/pkg/libraries/rest-api'

interface IProps {
  params: Promise<{ locale: Locale }>
}

const HomePage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params
  
  setRequestLocale(locale)

  // Create query client for server-side data fetching
  const queryClient = getQueryClient()

  // Prefetch the top albums data on the server
  try {
    await queryClient.prefetchQuery({
      queryKey: lastFmKeys.allTopAlbums(),
      queryFn: () => lastFmService.getAllTopAlbums(),
      staleTime: Infinity, // Data never becomes stale
    })
  } catch (error) {
    console.error('Failed to prefetch top albums:', error)
    // Continue without prefetched data - component will handle loading state
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default HomePage