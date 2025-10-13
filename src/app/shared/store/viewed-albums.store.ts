import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Album } from '@/pkg/libraries/rest-api'

interface ViewedAlbumsState {
  viewedAlbums: Album[]
  addViewedAlbum: (album: Album) => void
  clearViewedAlbums: () => void
}

export const useViewedAlbumsStore = create<ViewedAlbumsState>()(
  persist(
    (set) => ({
      viewedAlbums: [],
      addViewedAlbum: (album: Album) =>
        set((state: ViewedAlbumsState) => {
          const exists = state.viewedAlbums.some((a: Album) => a.collectionId === album.collectionId)
          if (exists) return state

          const newViewedAlbums = [album, ...state.viewedAlbums].slice(0, 10)
          return { viewedAlbums: newViewedAlbums }
        }),
      clearViewedAlbums: () => set({ viewedAlbums: [] }),
    }),
    {
      name: 'viewed-albums-storage',
    }
  )
)

