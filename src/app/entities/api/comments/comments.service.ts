import { getCommentsByAlbumId as getComments, createComment as create } from './comments.api'

export const CommentsService = {
  getCommentsByAlbumId: getComments,
  createComment: create,
} as const

