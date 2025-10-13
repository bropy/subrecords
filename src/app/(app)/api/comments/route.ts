import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createComment, getCommentsByAlbumId } from '@/app/entities/api/comments'

const createCommentSchema = z.object({
  albumId: z.string().min(1),
  albumName: z.string().min(1),
  artistName: z.string().min(1),
  artworkUrl: z.string().optional(),
  userName: z.string().min(2).max(50),
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(500),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = createCommentSchema.parse(body)

    const comment = await createComment(validatedData)

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating comment:', error)
    
    // Return more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to create comment'
    return NextResponse.json(
      { error: 'Failed to create comment', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const albumId = searchParams.get('albumId')

    if (!albumId) {
      return NextResponse.json(
        { error: 'albumId is required' },
        { status: 400 }
      )
    }

    const comments = await getCommentsByAlbumId(albumId)

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

