import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import AuthPageModule from '@/app/modules/auth/auth-page.component'

// interface
interface IProps {
  params: Promise<{ locale: Locale }>
}

// component
const AuthPage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  // return
  return <AuthPageModule />
}

export default AuthPage
