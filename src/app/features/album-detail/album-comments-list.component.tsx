'use client'

import { type FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { useTranslations } from 'next-intl'
import { albumCommentsQueryOptions } from '@/app/entities/api/comments'

// interface
interface IProps {
  albumId: string
}

// component
export const AlbumCommentsList: FC<IProps> = (props) => {
  const { albumId } = props

  const t = useTranslations('album.comments_list')
  const { data: comments } = useQuery(albumCommentsQueryOptions(albumId))


  if (!comments || comments.length === 0) {
    return (
      <div className='text-center text-gray-400 py-8'>
        <p>{t('no_comments', { defaultMessage: 'No comments yet. Be the first to comment!' })}</p>
      </div>
    )
  }

  // return
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-bold text-white mb-6'>
        {t('title', { defaultMessage: 'Comments' })} ({comments.length})
      </h3>
      {comments.map((comment) => (
        <Card
          key={comment.id}
          className='bg-gradient-to-br from-red-950/10 to-black border border-red-600/10 hover:border-red-600/30 transition-colors'
        >
          <CardHeader className='pb-2'>
            <div className='flex flex-col gap-1'>
              <h4 className='text-lg font-semibold text-white'>{comment.title}</h4>
              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <span className='text-red-600'>{comment.userName}</span>
                <span>•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardBody className='pt-2'>
            <p className='text-gray-300 whitespace-pre-wrap'>{comment.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

