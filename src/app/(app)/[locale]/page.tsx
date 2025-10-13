import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient, topAlbumsQueryOptions } from '@/pkg/libraries/rest-api'
import { HomeModule } from '@/app/modules'

export const revalidate = 300 // 5 minutes

// component
export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(topAlbumsQueryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}
