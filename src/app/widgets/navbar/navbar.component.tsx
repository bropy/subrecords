'use client'

import { type FC, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar'
import { Link } from '@/pkg/libraries/locale/navigation'
import { useTranslations } from 'next-intl'

import { NAVBAR_MENU_ITEMS, NAVBAR_CTA } from '@/app/shared/const'
import { LanguageSwitcher } from './language-switcher.component'

// component
const NavbarComponent: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()

  // return
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'w-full backdrop-blur-lg bg-black/90 transition-all border-b border-red-600/20',
        wrapper: 'max-w-screen-xl h-16 px-4 sm:px-6',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link href='/' className='font-bold text-xl'>
            Logo
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-6' justify='center'>
        {NAVBAR_MENU_ITEMS.map((item, index) => (
          <Link
            key={`${item.href}-${index}`}
            href={item.href}
            className='text-foreground hover:text-primary transition-colors'
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </NavbarContent>

      <NavbarContent justify='end' className='gap-3'>
        <LanguageSwitcher />
        <Link
          href={NAVBAR_CTA.href}
          className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold hidden sm:inline-block'
        >
          {t(NAVBAR_CTA.labelKey)}
        </Link>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <div className='py-2 flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>Language:</span>
            <LanguageSwitcher />
          </div>
        </NavbarMenuItem>
        {NAVBAR_MENU_ITEMS.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              href={item.href}
              className='w-full text-foreground hover:text-primary transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}
            >
              {t(item.labelKey)}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            href={NAVBAR_CTA.href}
            className='w-full inline-block mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center font-semibold'
            onClick={() => setIsMenuOpen(false)}
          >
            {t(NAVBAR_CTA.labelKey)}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default NavbarComponent