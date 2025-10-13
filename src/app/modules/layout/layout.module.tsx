import { type FC, type ReactNode } from 'react'

import { FooterComponent } from '@/app/widgets/footer'
import { NavbarComponent } from '@/app/widgets/navbar'

// interface
interface IProps {
  children: ReactNode
}

// component
const LayoutModule: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  // return
  return (
    <>
      <NavbarComponent />

      {children}

      <FooterComponent />
    </>
  )
}

export default LayoutModule