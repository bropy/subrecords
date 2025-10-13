import { type FC } from 'react'
import {
  HeroSectionComponent,
  AlbumsSectionComponent,
  CtaSectionComponent,
  ViewedAlbumsSectionComponent,
} from '@/app/features'

// component
const HomeModule: FC = () => {
  return (
    <main className='min-h-screen bg-black'>
      <HeroSectionComponent />
      <AlbumsSectionComponent />
      <CtaSectionComponent />
      <ViewedAlbumsSectionComponent />
    </main>
  )
}

export default HomeModule

