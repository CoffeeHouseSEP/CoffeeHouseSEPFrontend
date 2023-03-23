import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const SignOutButton = () => {
  const [hover, setHover] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cookies, , removeCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const translate = useTranslationFunction()

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
        backgroundColor: hover ? themeValue[darkTheme].colors.blue200 : '',
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
