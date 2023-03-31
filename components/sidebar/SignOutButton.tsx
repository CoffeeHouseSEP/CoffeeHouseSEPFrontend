import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { setIsLoggedIn } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const SignOutButton = ({ style }: { style?: object }) => {
  const [hover, setHover] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cookies, , removeCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID, ROLE_COOKIE])
  const router = useRouter()
  const translate = useTranslationFunction()

  const dispatch = useDispatch()

  const result = useApiCall<string, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.auth.logout,
        token: cookies.token,
      }),
    handleSuccess(message) {
      toast.success(translate(message))
      removeCookie(TOKEN_AUTHENTICATION)
      removeCookie(USER_ID)
      removeCookie(ROLE_COOKIE)
      dispatch(setIsLoggedIn(false))
      router.push('/')
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '0px 20px',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
        backgroundColor: hover ? themeValue[darkTheme].colors.primaryLightHover : '',
        ...style,
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        result.setLetCall(true)
      }}
    >
      {translate('signOut')}
    </div>
  )
}
