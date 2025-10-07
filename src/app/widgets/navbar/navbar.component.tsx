'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { type FC } from 'react'

import { routing } from '@/pkg/libraries/locale/routing'

const Navbar: FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('navbar')

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
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
