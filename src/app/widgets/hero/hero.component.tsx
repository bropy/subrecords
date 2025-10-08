'use client'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useFeatureFlag } from '@/app/shared/flags'
import { trackEvent } from '@/app/shared/analytics'
import { captureException, addBreadcrumb } from '@/app/shared/error-tracking'

export default function HeroSection() {
  const t = useTranslations('hero')
  const showMoreInfoButton = useFeatureFlag('button-on-hero', true)

  return (
    <section className="relative h-screen bg-netflix-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/80 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-netflix-white mb-6 leading-tight">
              {t('title')}
            </h1>

            <p className="text-lg md:text-xl text-netflix-text-gray mb-8 leading-relaxed max-w-xl">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-netflix-red hover:bg-red-700 text-netflix-white font-semibold px-8 py-3 text-lg rounded transition-colors"
                onClick={() => trackEvent('Hero CTA Clicked', {
                  button_type: 'primary',
                  button_text: t('cta_button'),
                  page: 'hero'
                })}
              >
                <span className="mr-2">▶</span>
                {t('cta_button')}
              </Button>

              {showMoreInfoButton && (
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-2 border-netflix-text-gray text-netflix-white hover:bg-netflix-white hover:text-netflix-black font-semibold px-8 py-3 text-lg rounded transition-colors"
                  onClick={() => {
                    // Track the button click
                    trackEvent('Hero CTA Clicked', {
                      button_type: 'secondary',
                      button_text: t('cta_secondary'),
                      page: 'hero',
                      feature_flag: 'button-on-hero'
                    })
                    
                    // Add breadcrumb for debugging
                    addBreadcrumb('More Info button clicked', 'user-action', 'info')
                    
                    // Throw an exception to test Sentry error tracking
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
                  <span className="mr-2">ℹ</span>
                  {t('cta_secondary')}
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md">
              <div>
                <div className="text-2xl font-bold text-netflix-white mb-1">50K+</div>
                <div className="text-netflix-text-gray text-sm">{t('stats.users')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-netflix-white mb-1">1M+</div>
                <div className="text-netflix-text-gray text-sm">{t('stats.songs')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-netflix-white mb-1">100K+</div>
                <div className="text-netflix-text-gray text-sm">{t('stats.playlists')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent"></div>
    </section>
  )
}
