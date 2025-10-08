import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { likesService, type Like, type AlbumLikeData } from '@/pkg/libraries/supabase/likes.service'
import { useAuthStore } from '@/app/shared/store/auth.store'

interface LikesState {
  likes: Like[]
  isLoading: boolean
  likeAlbum: (albumData: AlbumLikeData) => Promise<{ error: Error | null }>
  unlikeAlbum: (albumMbid: string) => Promise<{ error: Error | null }>
  isAlbumLiked: (albumMbid: string) => boolean
  fetchUserLikes: () => Promise<void>
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      likes: [],
      isLoading: false,

      likeAlbum: async (albumData: AlbumLikeData) => {
        const { user } = useAuthStore.getState()
        
        if (!user) {
          return { error: new Error('User not authenticated') }
        }

        try {
          set({ isLoading: true })
          
          const { data, error } = await likesService.likeAlbum(user.id, albumData)
          
          if (error) {
            return { error }
          }

          if (data) {
            set((state) => ({
              likes: [...state.likes, data]
            }))
          }

          return { error: null }
        } catch (error) {
          return { error: error as Error }
        } finally {
          set({ isLoading: false })
        }
      },

      unlikeAlbum: async (albumMbid: string) => {
        const { user } = useAuthStore.getState()
        
        if (!user) {
          return { error: new Error('User not authenticated') }
        }

        try {
          set({ isLoading: true })
          
          const { error } = await likesService.unlikeAlbum(user.id, albumMbid)
          
          if (error) {
            return { error }
          }

          set((state) => ({
            likes: state.likes.filter(like => like.album_mbid !== albumMbid)
          }))

          return { error: null }
        } catch (error) {
          return { error: error as Error }
        } finally {
          set({ isLoading: false })
        }
      },

      isAlbumLiked: (albumMbid: string) => {
        const { likes } = get()
        return likes.some(like => like.album_mbid === albumMbid)
      },

      fetchUserLikes: async () => {
        const { user } = useAuthStore.getState()
        
        if (!user) {
          set({ likes: [] })
          return
        }

        try {
          set({ isLoading: true })
          
          const { data, error } = await likesService.getUserLikes(user.id)
          
          if (error) {
            console.error('Error fetching user likes:', error)
            return
          }

          set({ likes: data || [] })
        } catch (error) {
          console.error('Error fetching user likes:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'likes-storage',
      partialize: (state) => ({
        likes: state.likes,
      }),
    }
  )
)
