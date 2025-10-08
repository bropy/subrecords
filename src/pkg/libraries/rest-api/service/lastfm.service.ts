import { lastFmFetcher } from '../fetcher/lastfm.fetcher'

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

export interface LastFmAlbumDetail {
  name: string
  mbid: string
  url: string
  image: Array<{
    '#text': string
    size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega'
  }>
  artist: {
    name: string
    mbid: string
    url: string
  }
  listeners: string
  playcount: string
  tracks: {
    track: Array<{
      name: string
      duration: string
      '@attr': {
        rank: string
      }
    }> | {
      name: string
      duration: string
      '@attr': {
        rank: string
      }
    }
  }
  wiki: {
    published: string
    summary: string
    content: string
  }
}

export interface LastFmAlbumDetailResponse {
  album: LastFmAlbumDetail
}

export interface LastFmError {
  error: number
  message: string
}

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
      const artistsResponse = await this.getTopArtists(1, 8)
      const artists = artistsResponse.artists.artist

      const albumPromises = artists.map(async (artist) => {
        try {
          const albumsResponse = await this.getTopAlbums(artist.name, 1, 2)
          return albumsResponse.topalbums.album.map(album => ({
            ...album,
            artist: artist.name
          }))
        } catch (error) {
          console.warn(`Failed to fetch albums for ${artist.name}:`, error)
          return []
        }
      })

      const allAlbums = await Promise.all(albumPromises)
      return allAlbums.flat().slice(0, 16)
    } catch (error) {
      throw new Error(`Failed to fetch all top albums: ${error}`)
    }
  },

  async getAlbumDetail(albumId: string): Promise<LastFmAlbumDetail> {
    const response = await lastFmFetcher.get('', {
      searchParams: {
        method: 'album.getinfo',
        mbid: albumId,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json<LastFmAlbumDetailResponse | LastFmError>()

    if ('error' in data) {
      throw new Error(`Last.fm API error: ${data.message}`)
    }

    return data.album
  },
}
