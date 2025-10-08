import { supabase } from '@/pkg/libraries/supabase/client'

export interface Like {
  id: string
  user_id: string
  album_mbid: string
  album_name: string
  artist_name: string
  album_image_url: string | null
  created_at: string
  updated_at: string
}

export interface AlbumLikeData {
  album_mbid: string
  album_name: string
  artist_name: string
  album_image_url?: string
}

class LikesService {
  async likeAlbum(userId: string, albumData: AlbumLikeData): Promise<{ data: Like | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('likes')
        .insert({
          user_id: userId,
          album_mbid: albumData.album_mbid,
          album_name: albumData.album_name,
          artist_name: albumData.artist_name,
          album_image_url: albumData.album_image_url || null,
        })
        .select()
        .single()

      if (error) {
        if (error.code === '23505') {
          return { data: null, error: null }
        }
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  async unlikeAlbum(userId: string, albumMbid: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('album_mbid', albumMbid)

      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async isAlbumLiked(userId: string, albumMbid: string): Promise<{ isLiked: boolean; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId)
        .eq('album_mbid', albumMbid)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return { isLiked: false, error: null }
        }
        return { isLiked: false, error }
      }

      return { isLiked: !!data, error: null }
    } catch (error) {
      return { isLiked: false, error: error as Error }
    }
  }

  async getUserLikes(userId: string): Promise<{ data: Like[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error }
      }

      return { data: data || [], error: null }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  }

  async getAlbumLikeCount(albumMbid: string): Promise<{ count: number; error: Error | null }> {
    try {
      const { count, error } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('album_mbid', albumMbid)

      if (error) {
        return { count: 0, error }
      }

      return { count: count || 0, error: null }
    } catch (error) {
      return { count: 0, error: error as Error }
    }
  }
}

export const likesService = new LikesService()
