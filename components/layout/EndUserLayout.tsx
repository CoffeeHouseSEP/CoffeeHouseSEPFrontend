import { useResponsive } from '@/hooks'
import { useEndUser } from '@/hooks/useEndUser'
import { useEffect } from 'react'
import FooterEndUser from '../footer/FooterEndUser'
import { NavBarEndUser } from '../navbar'

interface IEndUserLayout {
  children: React.ReactNode
}

export default function EndUserLayout({ children }: IEndUserLayout) {
  const pixel = useResponsive()

  useEffect(() => {}, [pixel])

  return (
    <>
      <NavBarEndUser />
      <div style={{ marginTop: 122, minHeight: 'calc(100vh - 172px)', overflowX: 'hidden' }}>
        {useEndUser(children)}
      </div>
      <FooterEndUser />
    </>
  )
}
