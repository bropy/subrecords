import { useQuery } from '@tanstack/react-query'

import { lastFmService } from '../service/lastfm.service'

// Query keys
export const lastFmKeys = {
  all: ['lastfm'] as const,
  topAlbums: (artist: string, page?: number, limit?: number) => 
    [...lastFmKeys.all, 'topAlbums', artist, page, limit] as const,
  allTopAlbums: () => [...lastFmKeys.all, 'allTopAlbums'] as const,
}

// Hook for getting top albums from a specific artist
export const useTopAlbums = (artist: string, page = 1, limit = 12) => {
  return useQuery({
    queryKey: lastFmKeys.topAlbums(artist, page, limit),
    queryFn: () => lastFmService.getTopAlbums(artist, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, 
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Hook for getting top albums from all artists
export const useAllTopAlbums = () => {
  return useQuery({
    queryKey: lastFmKeys.allTopAlbums(),
    queryFn: () => lastFmService.getAllTopAlbums(),
    staleTime: Infinity, // Data never becomes stale - use cached data indefinitely
    gcTime: Infinity, // Keep in cache forever
    refetchInterval: false, // Disable automatic refetching
    refetchIntervalInBackground: false, // Disable background refetching
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnReconnect: false, // Don't refetch when reconnecting to internet
    retry: 1, // Reduce retries to minimize requests
    retryDelay: 5000, // Wait 5 seconds before retry
  })
}
