import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const albums = pgTable('albums', {
  id: uuid('id').primaryKey().defaultRandom(),
  albumId: varchar('album_id', { length: 255 }).notNull().unique(), // iTunes/external album ID
  albumName: varchar('album_name', { length: 255 }).notNull(),
  artistName: varchar('artist_name', { length: 255 }).notNull(),
  artworkUrl: varchar('artwork_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

