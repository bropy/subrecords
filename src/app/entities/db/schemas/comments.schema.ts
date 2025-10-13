import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { albums } from './albums.schema'

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  albumDbId: uuid('album_db_id')
    .notNull()
    .references(() => albums.id, { onDelete: 'cascade' }),
  userName: varchar('user_name', { length: 100 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

