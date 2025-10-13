import { desc, eq } from 'drizzle-orm'
import { db } from '@/pkg/integrations/drizzle'
import { comments } from '../schemas'

export class CommentsRepository {
  async findByAlbumDbId(albumDbId: string) {
    return db.select().from(comments).where(eq(comments.albumDbId, albumDbId)).orderBy(desc(comments.createdAt))
  }

  async create(data: { albumDbId: string; userName: string; title: string; content: string }) {
    const [comment] = await db
      .insert(comments)
      .values({
        albumDbId: data.albumDbId,
        userName: data.userName,
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      })
      .returning()

    return comment
  }

  async findById(id: string) {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id)).limit(1)
    return comment || null
  }
}

export const commentsRepository = new CommentsRepository()

