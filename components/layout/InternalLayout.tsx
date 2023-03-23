import { useResponsive } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NavbarInternal } from '../navbar'
import { SideBar } from '../sidebar'

export const InternalLayout = ({
  children,
  useNavbar,
}: {
  children: React.ReactNode
  useNavbar?: boolean
}) => {
  const pixel = useResponsive()
  const [isOpenSideBar, setOpenSideBar] = useState(false)

  // const { isLoggedIn } = useSelector(authenticationSelector)

  const toggleSideBar = () => {
    setOpenSideBar(!isOpenSideBar)
  }
  const router = useRouter()

  useEffect(() => {
    setOpenSideBar(false)
  }, [router])

  const getWidthDiscard = () => {
    let thisWidth = 0
    if (pixel >= 1280) thisWidth += 300
    return thisWidth
  }

  return (
    <>
      {/* <Modal open={!isLoggedIn}>
        <LoginForm />
      </Modal> */}
      {(!useNavbar || isOpenSideBar) && (
        <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      )}
      <NavbarInternal setOpenSideBar={toggleSideBar} pixel={pixel} />
      <div
        style={{
          width: !useNavbar ? `calc(100% - ${getWidthDiscard()}px)` : '100%',
          marginLeft: pixel >= 1280 ? 'auto' : undefined,
          marginTop: '3.75rem',
        }}
      >
        <div style={{ padding: '0px 24px' }}>{children}</div>
      </div>
    </>
  )
}
