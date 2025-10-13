'use client'

import { type FC } from 'react'
import { Divider } from '@heroui/divider'
import { Link } from '@/pkg/libraries/locale/navigation'
import { useTranslations } from 'next-intl'

import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS, FOOTER_DESCRIPTION_KEY, FOOTER_COPYRIGHT_KEY } from '@/app/shared/const'

// component
const FooterComponent: FC = () => {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  // return
  return (
    <footer className='bg-black border-t border-red-600/20 px-6 pt-16 pb-8'>
      <section className='mx-auto max-w-screen-xl'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 pb-10'>
          <div className='grid content-start gap-6'>
            <Link href='/' className='font-bold text-2xl'>
              Logo
            </Link>
            <p className='text-sm opacity-80 max-w-xs'>
              {t(FOOTER_DESCRIPTION_KEY)}
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
            {FOOTER_COLUMNS.map((column, index) => (
              <div key={`${column.titleKey}-${index}`}>
                <h4 className='mb-4 font-semibold text-sm uppercase tracking-wider'>
                  {t(column.titleKey)}
                </h4>
                <ul className='space-y-3'>
                  {column.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${linkIndex}`}>
                      <Link
                        href={link.href}
                        className='text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all'
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Divider className='mb-6' />

        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm opacity-60 text-center md:text-left'>
            {t(FOOTER_COPYRIGHT_KEY, { year: currentYear })}
          </p>
          <div className='flex gap-6'>
            {FOOTER_LEGAL_LINKS.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className='text-sm opacity-60 hover:opacity-100 transition-opacity'
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </footer>
  )
}

export default FooterComponent