import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { LayoutModule } from '@/app/modules/layout'
import { envClient } from '@/config/env'
import { mainFont } from '@/config/fonts'
import { routing } from '@/pkg/libraries/locale/routing'
import { RestApiProvider } from '@/pkg/libraries/rest-api'
import { UiProvider } from '@/pkg/libraries/ui'
import { MixpanelProvider } from '@/pkg/integrations/mixpanel'
import { GrowthBookProvider } from '@/pkg/integrations/growthbook'

import '@/config/styles/global.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Website'
  const description = 'Website description'

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `${title} | %s`,
      },
      description: description,
      siteName: title,
      type: 'website',
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
  }
}

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // return
  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body className={`${mainFont.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider>
          <UiProvider locale={locale}>
            <RestApiProvider>
              <MixpanelProvider>
                <GrowthBookProvider>
                  <LayoutModule>{children}</LayoutModule>
                </GrowthBookProvider>
              </MixpanelProvider>
            </RestApiProvider>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout