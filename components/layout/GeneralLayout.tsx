import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useGetDarkMode } from '@/hooks'
import { setIsLoggedIn } from '@/redux/authentication'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BackdropLoading } from '../backdrop'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const { loading } = useSelector(ShareStoreSelector)

  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const isDark = useGetDarkMode()

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

  return (
    <>
      {children}
      <BackdropLoading isOpen={!!loading} />
    </>
  )
}
