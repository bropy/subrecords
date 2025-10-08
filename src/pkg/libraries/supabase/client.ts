import { createClient } from '@supabase/supabase-js'

import { envClient } from '@/config/env'

// Create Supabase client
export const supabase = createClient(
  envClient.NEXT_PUBLIC_SUPABASE_URL,
  envClient.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          album_mbid: string
          album_name: string
          artist_name: string
          album_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          album_mbid: string
          album_name: string
          artist_name: string
          album_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          album_mbid?: string
          album_name?: string
          artist_name?: string
          album_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
