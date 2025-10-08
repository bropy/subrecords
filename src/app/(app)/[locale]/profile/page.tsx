import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import ProfileModule from '@/app/modules/profile/profile-page.component'

// interface
interface IProps {
  params: Promise<{ locale: Locale }>
}
//component
const ProfilePage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  // return
  return <ProfileModule params={props.params} />
}

export default ProfilePage
