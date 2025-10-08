import { useQuery } from '@tanstack/react-query'

import { lastFmService } from '../service/lastfm.service'

// Query keys
export const lastFmKeys = {
  all: ['lastfm'] as const,
  topAlbums: (artist: string, page?: number, limit?: number) => 
    [...lastFmKeys.all, 'topAlbums', artist, page, limit] as const,
  allTopAlbums: () => [...lastFmKeys.all, 'allTopAlbums'] as const,
  albumDetail: (albumId: string) => [...lastFmKeys.all, 'albumDetail', albumId] as const,
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
    staleTime: 5 * 60 * 1000, 
    gcTime: Infinity, 
    refetchInterval: 5 * 60 * 1000, 
    refetchIntervalInBackground: true, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false, 
    retry: 1, 
    retryDelay: 5000, 
  })
}
