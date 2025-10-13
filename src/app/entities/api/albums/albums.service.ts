'use server'

import { albumsRepository } from '@/app/entities/db'

export interface TrackAlbumDto {
  albumId: string
  albumName: string
  artistName: string
  artworkUrl?: string
}

export async function trackAlbumView(dto: TrackAlbumDto): Promise<void> {
  'use server'
  
  try {
    await albumsRepository.findOrCreate({
      albumId: dto.albumId,
      albumName: dto.albumName,
      artistName: dto.artistName,
      artworkUrl: dto.artworkUrl,
    })
  } catch (error) {
    console.error('Failed to track album view:', error)
  }
}

