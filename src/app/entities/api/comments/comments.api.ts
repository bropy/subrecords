'use server'

import { albumsRepository, commentsRepository } from '@/app/entities/db'

export interface CreateCommentDto {
  albumId: string 
  albumName: string
  artistName: string
  artworkUrl?: string
  userName: string
  title: string
  content: string
}

export interface CommentDto {
  id: string
  userName: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// Server Action: Create a comment
export async function createComment(dto: CreateCommentDto): Promise<CommentDto> {
  'use server'
  
  try {
    const album = await albumsRepository.findOrCreate({
      albumId: dto.albumId,
      albumName: dto.albumName,
      artistName: dto.artistName,
      artworkUrl: dto.artworkUrl,
    })

    const comment = await commentsRepository.create({
      albumDbId: album.id,
      userName: dto.userName,
      title: dto.title,
      content: dto.content,
    })

    return {
      id: comment.id,
      userName: comment.userName,
      title: comment.title,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    }
  } catch (error) {
    console.error('Error in createComment:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create comment'
    )
  }
}

export async function getCommentsByAlbumId(albumId: string): Promise<CommentDto[]> {
  'use server'
  
  try {
    const album = await albumsRepository.findByAlbumId(albumId)
    
    if (!album) {
      return []
    }

    const comments = await commentsRepository.findByAlbumDbId(album.id)

    return comments.map((comment) => ({
      id: comment.id,
      userName: comment.userName,
      title: comment.title,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error in getCommentsByAlbumId:', error)
    return []
  }
}

