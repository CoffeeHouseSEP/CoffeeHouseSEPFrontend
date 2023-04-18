import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { encodeBase64, themeValue } from '@/lib'
import { authenticationSelector, setIsLoggedIn, setLoading } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import { LoginRequest, LoginResponseFailure, LoginResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const LoginForm = ({ isEndUser }: { isEndUser?: boolean }) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailForgotRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [, setCookie] = useCookies([TOKEN_AUTHENTICATION, USER_ID, ROLE_COOKIE])
  const translate = useTranslationFunction()
  const dispatch = useDispatch()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { isLoginLoading } = useSelector(authenticationSelector)
  const [step, setStep] = useState<'login' | 'forgot'>('login')

  const result = useApiCall<LoginResponseSuccess, LoginResponseFailure>({
    callApi: () =>
      postMethod<LoginRequest>({
        pathName: apiRoute.auth.login,
        request: {
          loginName: emailRef.current ? emailRef.current.value : '',
          loginPassword: encodeBase64(passwordRef.current ? passwordRef.current.value : ''),
        },
      }),
    handleSuccess(message, data) {
      if (router.asPath.includes('admin')) {
        if (data.role === 'USER') {
          toast.warn('Bạn cần đăng nhập bằng màn hình người dùng')
          router.push('/login')
        } else {
          router.push('/')
          toast.success(translate(message))
          setCookie(TOKEN_AUTHENTICATION, `Bearer ${data.token}`)
          setCookie(ROLE_COOKIE, data.role)
          dispatch(setIsLoggedIn(true))
        }
      } else if (data.role === 'ADMIN' || data.role === 'BRANCH_MANAGER') {
        toast.warn('Bạn không thể đăng nhập ở đây')
        router.push('/admin')
      } else {
        toast.success(translate(message))
        setCookie(TOKEN_AUTHENTICATION, `Bearer ${data.token}`)
        setCookie(ROLE_COOKIE, data.role)
        dispatch(setIsLoggedIn(true))
      }

      dispatch(setLoading(false))
    },
    handleError(status, message) {
      if (status) {
        dispatch(setLoading(false))
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })

  const { error, setLetCall, handleReset } = result

  const resultForgot = useApiCall<String, String>({
    callApi: () =>
      postMethod<null>({
        pathName: apiRoute.user.forgotPass,
        request: null,
        params: {
          username: usernameRef.current?.value || '',
          email: emailForgotRef.current?.value || '',
        },
      }),
    handleSuccess(message) {
      toast.success(translate(message))
      dispatch(setLoading(false))
      router.push('/')
    },
    handleError(status, message) {
      if (status) {
        dispatch(setLoading(false))
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })

  const handleLogin = () => {
    setLetCall(true)
    dispatch(setLoading(true))
  }

  const handleForgot = () => {
    resultForgot.setLetCall(true)
    dispatch(setLoading(true))
  }

  const signIn = useTranslation('signIn')
  const internalUser = useTranslation('internalAccount')
  const forgotPassword = useTranslation('forgotPassword')
  const loginName = useTranslation('loginName')
  const password = useTranslation('password')

  if (step === 'forgot')
    return (
      <>
        <div
          style={{
            color: themeValue[darkTheme].colors.foreground,
            fontSize: '1.125rem',
            paddingBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {forgotPassword}
        </div>
        <Input
          ref={usernameRef}
          {...inputStyles({})}
          labelLeft="Username"
          clearable
          onFocus={handleReset}
        />
        <Input
          ref={emailForgotRef}
          {...inputStyles({})}
          labelLeft="Email"
          clearable
          onFocus={handleReset}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            paddingTop: '1rem',
            gap: 10,
          }}
        >
          <Button onClick={() => setStep('login')} disabled={isLoginLoading}>
            Back to sign in
          </Button>
          <Button onClick={handleForgot} disabled={isLoginLoading}>
            {isLoginLoading ? <Loading /> : <>{forgotPassword}</>}
          </Button>
        </div>
      </>
    )

  return (
    <>
      <div
        style={{
          color: themeValue[darkTheme].colors.foreground,
          fontSize: '1.125rem',
          paddingBottom: '1rem',
          textAlign: 'center',
        }}
      >
        {signIn}
      </div>
      <Input
        ref={emailRef}
        {...inputStyles({ error: error?.result.loginName && translate(error.result.loginName) })}
        labelLeft={loginName}
        clearable
        onFocus={handleReset}
      />
      <Input
        ref={passwordRef}
        {...inputStyles({
          error: error?.result.loginPassword && translate(error.result.loginPassword),
        })}
        type="password"
        labelLeft={password}
        clearable
        onFocus={handleReset}
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button styleType="light" onClick={() => setStep('forgot')} disabled={isLoginLoading}>
          {forgotPassword}?
        </Button>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          paddingTop: '1rem',
          gap: 10,
        }}
      >
        {isEndUser && <Button onClick={() => router.push('/admin')}>{internalUser}</Button>}
        <Button onClick={handleLogin} disabled={isLoginLoading}>
          {isLoginLoading ? <Loading /> : <>{signIn}</>}
        </Button>
      </div>
    </>
  )
}
