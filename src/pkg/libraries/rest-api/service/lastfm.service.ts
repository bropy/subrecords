import { lastFmFetcher } from '../fetcher/lastfm.fetcher'

// Types
export interface LastFmAlbum {
  name: string
  mbid: string
  listeners: string
  url: string
  image: Array<{
    '#text': string
    size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega'
  }>
}

export interface LastFmArtist {
  name: string
  mbid: string
  listeners: string
  url: string
  image: Array<{
    '#text': string
    size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega'
  }>
}

export interface LastFmTopAlbumsResponse {
  topalbums: {
    album: LastFmAlbum[]
    '@attr': {
      artist: string
      page: string
      perPage: string
      totalPages: string
      total: string
    }
  }
}

export interface LastFmTopArtistsResponse {
  artists: {
    artist: LastFmArtist[]
    '@attr': {
      page: string
      perPage: string
      totalPages: string
      total: string
    }
  }
}

export interface LastFmError {
  error: number
  message: string
}

// Service methods
export const lastFmService = {
  async getTopArtists(page = 1, limit = 10): Promise<LastFmTopArtistsResponse> {
    const response = await lastFmFetcher.get('', {
      searchParams: {
        method: 'chart.gettopartists',
        page: page.toString(),
        limit: limit.toString(),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json<LastFmTopArtistsResponse | LastFmError>()

    if ('error' in data) {
      throw new Error(`Last.fm API error: ${data.message}`)
    }

    return data
  },

  async getTopAlbums(artist: string, page = 1, limit = 12): Promise<LastFmTopAlbumsResponse> {
    const response = await lastFmFetcher.get('', {
      searchParams: {
        method: 'artist.gettopalbums',
        artist,
        page: page.toString(),
        limit: limit.toString(),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json<LastFmTopAlbumsResponse | LastFmError>()

    if ('error' in data) {
      throw new Error(`Last.fm API error: ${data.message}`)
    }

    return data
  },

  async getAllTopAlbums(): Promise<LastFmAlbum[]> {
    try {
      // Get top artists first
      const artistsResponse = await this.getTopArtists(1, 8)
      const artists = artistsResponse.artists.artist

      // Fetch top albums for each artist
      const albumPromises = artists.map(async (artist) => {
        try {
          const albumsResponse = await this.getTopAlbums(artist.name, 1, 2) // Get top 2 albums per artist
          return albumsResponse.topalbums.album.map(album => ({
            ...album,
            artist: artist.name // Add artist name to album
          }))
        } catch (error) {
          console.warn(`Failed to fetch albums for ${artist.name}:`, error)
          return []
        }
      })

      const allAlbums = await Promise.all(albumPromises)
      return allAlbums.flat().slice(0, 16) // Limit to 16 albums total
    } catch (error) {
      throw new Error(`Failed to fetch all top albums: ${error}`)
    }
  },
}
