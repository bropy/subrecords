export interface Album {
  id: string
  albumId: string 
  albumName: string
  artistName: string
  artworkUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  albumDbId: string 
  userName: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}