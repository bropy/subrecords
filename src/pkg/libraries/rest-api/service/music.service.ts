import { queryOptions } from '@tanstack/react-query'
import { musicApiFetcher } from '../fetcher/music-api.fetcher'

// types
export interface Album {
  collectionId: number
  artistName: string
  collectionName: string
  artworkUrl100: string
  artworkUrl60: string
  collectionPrice: number
  releaseDate: string
  trackCount: number
  primaryGenreName: string
  collectionViewUrl: string
  slug: string
}

interface TopAlbumsResponse {
  results: Album[]
}

// fetch top albums
export const fetchTopAlbums = async (): Promise<Album[]> => {
  const response = await musicApiFetcher.get('search', {
    searchParams: {
      term: 'music',
      media: 'music',
      entity: 'album',
      limit: 10,
      sort: 'recent',
    },
  })

  const data: TopAlbumsResponse = await response.json()
  
  return data.results.map((album) => ({
    ...album,
    slug: `${album.collectionName}-${album.collectionId}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  }))
}

// fetch album by slug
const fetchAlbumBySlug = async (slug: string): Promise<Album | null> => {
  const collectionId = slug.split('-').pop()
  if (!collectionId) return null

  const response = await musicApiFetcher.get('lookup', {
    searchParams: {
      id: collectionId,
      entity: 'album',
    },
  })

  const data: TopAlbumsResponse = await response.json()
  const album = data.results.find((item) => item.collectionId === Number(collectionId))

  if (!album) return null

  return {
    ...album,
    slug,
  }
}

// query options
export const topAlbumsQueryOptions = () =>
  queryOptions({
    queryKey: ['albums', 'top'],
    queryFn: fetchTopAlbums,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

export const albumBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['albums', 'slug', slug],
    queryFn: () => fetchAlbumBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  })

