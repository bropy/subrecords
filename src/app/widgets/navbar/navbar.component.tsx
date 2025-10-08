'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { type FC } from 'react'

import { routing } from '@/pkg/libraries/locale/routing'
import { useAuthStore } from '@/app/shared/store/auth.store'
import { trackEvent } from '@/app/shared/analytics'

// component
const Navbar: FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('navbar')
  
  const { userProfile, isAuthenticated, isLoading, signOut } = useAuthStore()

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    trackEvent('Language Changed', {
      from_locale: locale,
      to_locale: newLocale,
      page: pathWithoutLocale
    })
    
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

  // return
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-blue/95 backdrop-blur-md border-b border-dark-blue-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-beige-100">
              SubMusic
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {!isLoading && (
              <button
                onClick={handleAuthClick}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg transition-all duration-200 hover:bg-red-700 hover:scale-105 font-bold shadow-xl border border-red-500"
              >
                {isAuthenticated ? (
                  <>
                    Sign Out
                  </>
                ) : (
                  <>
                    Sign In
                  </>
                )}
              </button>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 px-6 py-2 bg-dark-blue-gray text-beige-400 rounded-lg">
                <div className="w-4 h-4 border-2 border-beige-400 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            )}

            {isAuthenticated && userProfile && (
              <button
                onClick={() => {
                  trackEvent('Profile Clicked', {
                    user_email: userProfile.email,
                    page: pathname
                  })
                  router.push(`/${locale}/profile`)
                }}
                className="flex items-center gap-2 text-beige-300 text-sm hover:text-beige-100 transition-colors px-3 py-2 rounded-lg hover:bg-dark-blue-gray"
              >
                <span>{userProfile.email}</span>
              </button>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-sm text-beige-400">{t('language_label')}</span>
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-dark-blue-gray bg-dark-blue-light text-beige-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                {routing.locales.map((loc) => (
                  <option key={loc} value={loc} className="bg-dark-blue-light text-beige-100">
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
