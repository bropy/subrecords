import { eq } from 'drizzle-orm'
import { db } from '@/pkg/integrations/drizzle'
import { albums } from '../schemas'

export class AlbumsRepository {
  async findByAlbumId(albumId: string) {
    const [album] = await db.select().from(albums).where(eq(albums.albumId, albumId)).limit(1)
    return album || null
  }

  async create(data: { albumId: string; albumName: string; artistName: string; artworkUrl?: string }) {
    const [album] = await db
      .insert(albums)
      .values({
        albumId: data.albumId,
        albumName: data.albumName,
        artistName: data.artistName,
        artworkUrl: data.artworkUrl,
        updatedAt: new Date(),
      })
      .returning()

    return album
  }

  async findOrCreate(data: { albumId: string; albumName: string; artistName: string; artworkUrl?: string }) {
    const existing = await this.findByAlbumId(data.albumId)
    if (existing) {
      return existing
    }
    return this.create(data)
  }
}

export const albumsRepository = new AlbumsRepository()

