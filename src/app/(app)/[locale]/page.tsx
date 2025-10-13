import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from 'next-intl'

import { getQueryClient, topAlbumsQueryOptions } from '@/pkg/libraries/rest-api'
import { HomeModule } from '@/app/modules'

// interface
interface IProps {
  params: Promise<{ locale: Locale }>
}

export const revalidate = 300 // 5 minutes

// component
export default async function Home(props: Readonly<IProps>) {
  const { params } = props
  const { locale } = await params

  setRequestLocale(locale)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(topAlbumsQueryOptions())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}
