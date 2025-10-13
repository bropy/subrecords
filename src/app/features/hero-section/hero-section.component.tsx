'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { useFeatureFlag } from '@/pkg/integrations/growthbook'
import { trackEvent } from '@/pkg/integrations/mixpanel'
import { captureError } from '@/pkg/integrations/sentry'

// component
const HeroSectionComponent: FC = () => {
  const t = useTranslations('home.hero')
  const showExtraButton = useFeatureFlag('button-on-hero', true)

  const handleExploreClick = () => {
    trackEvent('Hero CTA Clicked', {
      button: 'Explore Now',
      section: 'Hero',
    })
  }

  const handleTrendingClick = () => {
    trackEvent('Hero CTA Clicked', {
      button: 'Trending',
      section: 'Hero',
    })
  }

  const handleTestErrorClick = () => {
    try {
      trackEvent('Error Test Triggered', {
        section: 'Hero',
      })
      
      throw new Error('This is a test error from Hero ')
    } catch (error) {
      
      const eventId = captureError(error as Error, {
        section: 'Hero',
        action: 'Test Error Button',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      })
    }
  }

  return (
    <section className='relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black to-red-950/20'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-700' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-20 text-center'>
        <div className='mb-8 animate-fade-in'>
          <h1 className='text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight'>
            {t('title_part1')}
            <span className='text-red-600'> {t('title_highlight')}</span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            {t('subtitle')}
          </p>
        </div>

        <div className='max-w-3xl mx-auto mb-12 animate-slide-up'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000' />
            <div className='relative bg-black/50 backdrop-blur-sm border border-red-600/30 rounded-2xl p-2'>
              <Input
                type='search'
                placeholder={t('search_placeholder')}
                classNames={{
                  base: 'w-full',
                  input: 'text-white text-lg placeholder:text-gray-400',
                  inputWrapper: 'bg-transparent border-none shadow-none h-16 px-6',
                }}
                endContent={
                  <Button
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold px-8 h-12 transition-all duration-300 hover:scale-105'
                    radius='lg'
                  >
                    {t('search_button')}
                  </Button>
                }
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay'>
          <Button
            size='lg'
            className='bg-red-600 hover:bg-red-700 text-white font-semibold px-10 h-14 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/50'
            radius='lg'
            onClick={handleExploreClick}
          >
            {t('explore_button')}
          </Button>
          <Button
            size='lg'
            variant='bordered'
            className='border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-10 h-14 text-lg transition-all duration-300 hover:scale-105'
            radius='lg'
            onClick={handleTrendingClick}
          >
            {t('trending_button')}
          </Button>
          {showExtraButton && (
            <Button
              size='lg'
              variant='ghost'
              className='border-2 border-red-600/50 text-red-600 hover:bg-red-600/10 font-semibold px-10 h-14 text-lg transition-all duration-300 hover:scale-105'
              radius='lg'
              onClick={handleTestErrorClick}
            >
              🔴 Test Sentry
            </Button>
          )}
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 animate-fade-in-delay-2'>
          {[
            { label: t('stat_tracks'), value: '10M+' },
            { label: t('stat_artists'), value: '500K+' },
            { label: t('stat_playlists'), value: '1M+' },
            { label: t('stat_users'), value: '5M+' },
          ].map((stat, index) => (
            <div key={index} className='text-center group cursor-pointer'>
              <div className='text-4xl md:text-5xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform'>
                {stat.value}
              </div>
              <div className='text-sm text-gray-400 uppercase tracking-wider'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSectionComponent

