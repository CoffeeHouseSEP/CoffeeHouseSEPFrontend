import { useResponsive } from '@/hooks'
import { LoginForm } from '@/modules/sign-in'
import { authenticationSelector } from '@/redux/authentication'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../modal'
import { NavbarInternal } from '../navbar'
import { SideBar } from '../sidebar'

const InternalLayout = ({
  children,
  useNavbar,
}: {
  children: React.ReactNode
  useNavbar?: boolean
}) => {
  const pixel = useResponsive()
  const [isOpenSideBar, setOpenSideBar] = useState(false)

  const { isLoggedIn } = useSelector(authenticationSelector)

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
      <Modal open={!isLoggedIn}>
        <LoginForm />
      </Modal>
      {(!useNavbar || isOpenSideBar) && (
        <SideBar isOpenSideBar={isOpenSideBar} setOpenSideBar={setOpenSideBar} pixel={pixel} />
      )}
      <NavbarInternal setOpenSideBar={toggleSideBar} pixel={pixel} />
      <div
        style={{
          width: !useNavbar ? `calc(100% - ${getWidthDiscard()}px)` : '100%',
          marginLeft: pixel >= 1280 ? 'auto' : undefined,
          marginTop: '3.75rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ padding: '0px 24px' }}>{children}</div>
      </div>
    </>
  )
}

export default InternalLayout
