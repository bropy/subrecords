'use client'

import { type FC } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/pkg/libraries/locale/navigation'
import { Button } from '@heroui/button'
import { routing } from '@/pkg/libraries/locale/routing'

export const LanguageSwitcher: FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = () => {
    const newLocale = locale === 'en' ? 'de' : 'en'
    router.replace(pathname, { locale: newLocale })
  }

  const currentLanguage = locale === 'en' ? 'EN' : 'DE'
  const nextLanguage = locale === 'en' ? 'DE' : 'EN'

  return (
    <Button
      size='sm'
      variant='bordered'
      className='border-red-600/50 text-white hover:bg-red-600/10 font-semibold min-w-16 transition-all duration-300'
      radius='lg'
      onClick={handleLanguageChange}
    >
      <span className='flex items-center gap-1'>
        <span className='text-red-600'>{currentLanguage}</span>
        <span className='text-xs opacity-60'>→ {nextLanguage}</span>
      </span>
    </Button>
  )
}

