'use client'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useFeatureFlag } from '@/app/shared/flags'
import { trackEvent } from '@/app/shared/analytics'
import { captureException, addBreadcrumb } from '@/app/shared/error-tracking'

// component
export default function HeroSection() {
  const t = useTranslations('hero')
  const showMoreInfoButton = useFeatureFlag('button-on-hero', true)

  // return
  return (
    <section className="relative h-[70vh] bg-dark-blue flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-dark-blue/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
      </div>
      
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(230,0,35,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,51,51,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-netflix-white leading-tight tracking-tight drop-shadow-lg">
                {t('title')}
              </h1>

              <p className="text-lg md:text-xl text-beige-200 max-w-2xl leading-relaxed drop-shadow-md">
                {t('subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-red-600 text-white font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 hover:bg-red-700 hover:scale-105 shadow-xl border-2 border-red-500"
                  onClick={() => trackEvent('Hero CTA Clicked', {
                    button_type: 'primary',
                    button_text: t('cta_button'),
                    page: 'hero'
                  })}
                >
                  {t('cta_button')}
                </Button>

                {showMoreInfoButton && (
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-2 border-red-500 text-red-400 bg-transparent font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 hover:bg-red-600 hover:text-white hover:scale-105 shadow-xl"
                    onClick={() => {
                      trackEvent('Hero CTA Clicked', {
                        button_type: 'secondary',
                        button_text: t('cta_secondary'),
                        page: 'hero',
                        feature_flag: 'button-on-hero'
                      })
                      
                      addBreadcrumb('More Info button clicked', 'user-action', 'info')
                      
                      try {
                        throw new Error('More Info button clicked - Testing Sentry error tracking')
                      } catch (error) {
                        console.error('More Info button error:', error)
                        captureException(error as Error, {
                          button_type: 'secondary',
                          button_text: t('cta_secondary'),
                          page: 'hero',
                          feature_flag: 'button-on-hero'
                        })
                      }
                    }}
                  >
                    {t('cta_secondary')}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-beige-800/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-beige-100 mb-1 drop-shadow-md">50K+</div>
                  <div className="text-beige-400 text-sm uppercase tracking-wide">{t('stats.users')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-beige-100 mb-1 drop-shadow-md">1M+</div>
                  <div className="text-beige-400 text-sm uppercase tracking-wide">{t('stats.songs')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-beige-100 mb-1 drop-shadow-md">100K+</div>
                  <div className="text-beige-400 text-sm uppercase tracking-wide">{t('stats.playlists')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
