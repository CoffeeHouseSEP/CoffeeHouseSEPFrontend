import { Button, Input } from '@/components'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

// interface ILoginProps {
//   setPage: (value: 'login' | 'verify') => void
//   setVerifyType: (value: 'verifyEmail' | 'verify2FA') => void
//   setEmail: (value: string) => void
// }

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  //   const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  //   const translate = useTranslationFunction()
  //   const dispatch = useDispatch()
  //   const { darkTheme } = useSelector(GeneralSettingsSelector)
  //   const { isLoginLoading } = useSelector(authenticationSelector)

  //   const resultForgotPassword = useApiCall({
  //     callApi: () =>
  //       postMethod({
  //         pathName: apiRoute.auth.forgotPassword,
  //         params: {
  //           email: emailRef?.current?.value || '',
  //         },
  //       }),
  //     handleError(status, message) {
  //       if (status) {
  //         toast.error(translate(message))
  //       }
  //     },
  //     handleSuccess(message) {
  //       toast.success(translate(message))
  //     },
  //   })

  //   const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
  //     callApi: () =>
  //       postMethod<LoginRequest>({
  //         pathName: apiRoute.auth.login,
  //         request: {
  //           username: emailRef.current ? emailRef.current.value : '',
  //           password: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
  //         },
  //       }),
  //     handleSuccess(message, data) {
  //       if (data.needVerify) {
  //         setVerifyType('verifyEmail')
  //         setPage('verify')
  //         setEmail(emailRef?.current?.value || '')
  //       }
  //       if (data.verify2Fa) {
  //         setVerifyType('verify2FA')
  //         setPage('verify')
  //         setEmail(emailRef?.current?.value || '')
  //       }
  //       if (!data.needVerify && !data.verify2Fa) {
  //         toast.success(translate(message))
  //         setCookie(TOKEN_AUTHENTICATION, data.token, {
  //           path: '/',
  //           expires: new Date(new Date().setDate(new Date().getDate() + 7)),
  //         })
  //         setCookie(USER_ID, data.userId, {
  //           path: '/',
  //           expires: new Date(new Date().setDate(new Date().getDate() + 7)),
  //         })
  //         dispatch(setIsLoggedIn(true))
  //         dispatch(setLoading(false))
  //       }
  //     },
  //     handleError(status, message) {
  //       if (status) {
  //         dispatch(setLoading(false))
  //         toast.error(translate(message))
  //       }
  //     },
  //     preventLoadingGlobal: true,
  //   })

  //   const { error, setLetCall, handleReset } = result

  //   const handleLogin = () => {
  //     setLetCall(true)
  //     dispatch(setLoading(true))
  //   }

  //   const usernameLabel = useTranslation('username')
  //   const signIn = useTranslation('signIn')
  //   const passwordLabel = useTranslation('password')
  //   const forgotPassword = useTranslation('forgotPassword')

  return (
    <div>
      <div
        style={{
          color: themeValue[darkTheme].colors.foreground,
          fontSize: '1.125rem',
          paddingBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Sign IN
      </div>
      <div>
        <Input
          style={{ width: '15%', margin: '0 auto' }}
          ref={emailRef}
          labelLeft="username"
          clearable
        />
        <Input
          style={{ width: '15%', margin: '0 auto' }}
          ref={passwordRef}
          type="password"
          labelLeft="password"
          clearable
        />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button styleType="light">forgotPassword?</Button>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}
