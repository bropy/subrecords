import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'
import { getLangDir } from 'rtl-detect'

import { routing } from '@/pkg/libraries/locale/routing'
import Navbar from '@/app/widgets/navbar/navbar.component'
import { UiProvider } from '@/pkg/libraries/ui'
import { RestApiProvider } from '@/pkg/libraries/rest-api'
import '@/config/styles/globals.css'

interface IProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  await props.params

  return {
    title: 'MusicHub - Discover Your Next Favorite Song',
    description: 'Join thousands of music lovers discovering new tracks, creating playlists, and sharing their musical journey',
  }
}

const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const direction = getLangDir(locale)

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-netflix-black">
        <NextIntlClientProvider>
          <RestApiProvider>
            <UiProvider>
              <Navbar />
              <main>
                {children}
              </main>
            </UiProvider>
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout