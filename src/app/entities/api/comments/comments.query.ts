import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'
import type { CommentDto, CreateCommentDto } from './comments.api'

const fetchCommentsByAlbumId = async (albumId: string): Promise<CommentDto[]> => {
  const response = await ky.get('/api/comments', {
    searchParams: { albumId },
  })
  return response.json()
}

const createComment = async (data: CreateCommentDto): Promise<CommentDto> => {
  try {
    const response = await ky.post('/api/comments', {
      json: data,
    })
    return response.json()
  } catch (error) {
    if (error instanceof Response) {
      const errorData = await error.json().catch(() => ({}))
      throw new Error(errorData.details || errorData.error || 'Failed to create comment')
    }
    throw error
  }
}

export const albumCommentsQueryOptions = (albumId: string) =>
  queryOptions({
    queryKey: ['comments', 'album', albumId],
    queryFn: () => fetchCommentsByAlbumId(albumId),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  })

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', 'album', variables.albumId],
      })
    },
  })
}

