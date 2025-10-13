import { type FC } from 'react'
import { AlbumDetailComponent } from '@/app/features'

// interface
interface IProps {
  slug: string
}

// component
const AlbumModule: FC<IProps> = (props) => {
  const { slug } = props

  return (
    <main className='min-h-screen bg-black'>
      <AlbumDetailComponent slug={slug} />
    </main>
  )
}

export default AlbumModule

