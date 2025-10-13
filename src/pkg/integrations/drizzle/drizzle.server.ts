import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { envServer } from '@/config/env'

const connectionString = envServer.DATABASE_URL

export const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client)