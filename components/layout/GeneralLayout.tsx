import { ROLE_COOKIE, TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useGetDarkMode } from '@/hooks'
import { authenticationSelector, setIsLoggedIn } from '@/redux/authentication'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BackdropLoading } from '../backdrop'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { isLoggedIn } = useSelector(authenticationSelector)
  const { loading } = useSelector(ShareStoreSelector)

  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID, ROLE_COOKIE])

  const isDark = useGetDarkMode()

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isDark) {
      if (darkTheme === 'light') dispatch(setGeneralSettings({ darkTheme: 'dark' }))
    } else if (darkTheme === 'dark') dispatch(setGeneralSettings({ darkTheme: 'light' }))
  }, [isDark, dispatch, darkTheme])

  useEffect(() => {
    if (cookies && cookies.token) {
      dispatch(setIsLoggedIn(true))
    } else {
      dispatch(setIsLoggedIn(false))
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      if (router.pathname.includes('account')) {
        if (cookies.role === 'BRANCH_MANAGER' || cookies.role === 'ADMIN') {
          router.push('/settings')
        }
      }
      if (router.pathname.includes('settings')) {
        if (cookies.role === 'USER') {
          router.push('/account')
        }
      }
      if (router.pathname.includes('admin') || router.pathname.includes('branch')) {
        if (cookies.role === 'USER') {
          router.push('/')
        }
        if (router.pathname.includes('admin')) {
          if (cookies.role === 'BRANCH_MANAGER') {
            router.push('/branch')
          }
        }
        if (router.pathname.includes('branch')) {
          if (cookies.role === 'ADMIN') {
            router.push('/admin')
          }
        }
      }
    }
  }, [isLoggedIn])

  return (
    <>
      {children}
      <BackdropLoading isOpen={!!loading} />
    </>
  )
}
