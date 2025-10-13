'use client'

import type { FC, ReactNode } from 'react'

import { ToastProvider } from '@heroui/toast'
import { HeroUIProvider } from '@heroui/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
// interface
interface IProps {
  children: ReactNode
  locale?: string
}

// component
const UiProvider: FC<Readonly<IProps>> = (props) => {
  const { children, locale } = props

  // return
  return (
    <HeroUIProvider locale={locale}>
      <NextThemesProvider attribute='class' forcedTheme='light' defaultTheme='system' disableTransitionOnChange>
        {children}

        <ToastProvider
          maxVisibleToasts={3}
          placement='top-right'
          toastProps={{
            radius: 'md',
            timeout: 3500,
            classNames: { title: 'first-letter:uppercase', description: 'first-letter:uppercase' },
          }}
        />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}

export default UiProvider