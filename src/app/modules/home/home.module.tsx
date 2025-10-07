'use client'

import ContainerComponent from '@/app/shared/ui/container/container.component'
import HeroSection from '@/app/widgets/hero/hero.component'
import TopAlbumsSection from '@/app/features/top-albums/top-albums.component'

export default function HomeModule() {
  return (
    <ContainerComponent className="w-full">
      <HeroSection />
      <TopAlbumsSection />
    </ContainerComponent>
  )
}
