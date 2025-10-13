'use client'

import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea } from '@heroui/input'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { useTranslations } from 'next-intl'
import { useCreateCommentMutation } from '@/app/entities/api/comments'
import { trackEvent } from '@/pkg/integrations/mixpanel'

// validation
const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Comment must be at least 10 characters').max(500, 'Comment must be less than 500 characters'),
})

type CommentFormData = z.infer<typeof commentSchema>

// interface
interface IProps {
  albumId: string
  albumName: string
  artistName: string
  artworkUrl?: string
}

// component
export const AlbumCommentForm: FC<IProps> = (props) => {
  const { albumId, albumName, artistName, artworkUrl } = props

  const t = useTranslations('album.comment_form')
  const createCommentMutation = useCreateCommentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      title: '',
      content: '',
    },
  })

  const onSubmit = async (data: CommentFormData) => {
    try {
      await createCommentMutation.mutateAsync({
        albumId,
        albumName,
        artistName,
        artworkUrl,
        userName: data.name,
        title: data.title,
        content: data.content,
      })

      trackEvent('Comment Created', {
        album_id: albumId,
        album_name: albumName,
        artist_name: artistName,
      })

      alert('Comment submitted successfully!')
      reset()
    } catch (error) {
      console.error('Failed to submit comment:', error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit comment. Please try again.'
      alert(`Error: ${errorMessage}`)
    }
  }

  // return
  return (
    <Card className='bg-gradient-to-br from-red-950/20 to-black border border-red-600/20'>
      <CardHeader className='pb-4'>
        <h3 className='text-2xl font-bold text-white'>{t('title')}</h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <Input
            {...register('name')}
            label={t('name_label')}
            placeholder={t('name_placeholder')}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            classNames={{
              input: 'text-white',
              inputWrapper: 'bg-black/50 border-red-600/30 hover:border-red-600/50',
              label: 'text-gray-300',
            }}
            isRequired
          />

          <Input
            {...register('title')}
            label={t('title_label')}
            placeholder={t('title_placeholder')}
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
            classNames={{
              input: 'text-white',
              inputWrapper: 'bg-black/50 border-red-600/30 hover:border-red-600/50',
              label: 'text-gray-300',
            }}
            isRequired
          />

          <Textarea
            {...register('content')}
            label={t('content_label')}
            placeholder={t('content_placeholder')}
            isInvalid={!!errors.content}
            errorMessage={errors.content?.message}
            minRows={4}
            classNames={{
              input: 'text-white',
              inputWrapper: 'bg-black/50 border-red-600/30 hover:border-red-600/50',
              label: 'text-gray-300',
            }}
            isRequired
          />

          <div className='flex gap-4 justify-end'>
            <Button
              type='button'
              variant='bordered'
              className='border-white/20 text-white hover:bg-white/10'
              onPress={() => reset()}
              isDisabled={isSubmitting}
            >
              {t('cancel_button')}
            </Button>
            <Button
              type='submit'
              className='bg-red-600 hover:bg-red-700 text-white font-semibold'
              isLoading={isSubmitting}
            >
              {t('submit_button')}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

