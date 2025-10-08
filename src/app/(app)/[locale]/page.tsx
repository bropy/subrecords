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

  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: lastFmKeys.allTopAlbums(),
      queryFn: () => lastFmService.getAllTopAlbums(),
      staleTime: Infinity,
    })
  } catch (error) {
    console.error('Failed to prefetch top albums:', error)
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default HomePage