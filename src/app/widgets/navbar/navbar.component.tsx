'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { type FC } from 'react'
import { LogIn, LogOut, User } from 'lucide-react'

import { routing } from '@/pkg/libraries/locale/routing'
import { useAuthStore } from '@/app/shared/store/auth.store'
import { trackEvent } from '@/app/shared/analytics'

const Navbar: FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('navbar')
  
  const { userProfile, isAuthenticated, isLoading, signOut } = useAuthStore()

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // Track language change
    trackEvent('Language Changed', {
      from_locale: locale,
      to_locale: newLocale,
      page: pathWithoutLocale
    })
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      trackEvent('User Signed Out', {
        user_email: userProfile?.email,
        page: pathname
      })
      signOut()
    } else {
      trackEvent('Sign In Clicked', {
        page: pathname
      })
      router.push(`/${locale}/auth`)
    }
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-netflix-black/80 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-netflix-red flex items-center">
              <span className="mr-2">🎵</span>
              {t('app_name')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Auth Button */}
            {!isLoading && (
              <button
                onClick={handleAuthClick}
                className="flex items-center gap-2 px-4 py-2 bg-netflix-red hover:bg-red-700 text-netflix-white rounded-lg transition-colors text-sm font-medium"
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center gap-2 px-4 py-2 bg-netflix-light-gray text-netflix-text-gray rounded-lg text-sm">
                <div className="w-4 h-4 border-2 border-netflix-text-gray border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            )}

            {/* User Info */}
            {isAuthenticated && userProfile && (
              <button
                onClick={() => {
                  trackEvent('Profile Clicked', {
                    user_email: userProfile.email,
                    page: pathname
                  })
                  router.push(`/${locale}/profile`)
                }}
                className="flex items-center gap-2 text-netflix-text-gray text-sm hover:text-netflix-white transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{userProfile.email}</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-netflix-text-gray">{t('language_label')}</span>
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-netflix-text-gray/30 bg-netflix-dark-gray text-netflix-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
              >
                {routing.locales.map((loc) => (
                  <option key={loc} value={loc} className="bg-netflix-dark-gray text-netflix-white">
                    {t(`languages.${loc}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
