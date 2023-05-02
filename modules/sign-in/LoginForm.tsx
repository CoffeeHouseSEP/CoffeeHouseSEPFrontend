import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
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
          router.push('/admin')
          toast.success(translate(message))
          setCookie(TOKEN_AUTHENTICATION, `Bearer ${data.token}`)
          setCookie(ROLE_COOKIE, data.role)
          dispatch(setIsLoggedIn(true))
        }
      }
      if (!router.asPath.includes('admin')) {
        if (data.role === 'ADMIN' || data.role === 'BRANCH_MANAGER') {
          toast.warn('Bạn không thể đăng nhập ở đây')
          router.push('/admin')
        } else {
          router.push('/')
          toast.success(translate(message))
          setCookie(TOKEN_AUTHENTICATION, `Bearer ${data.token}`)
          setCookie(ROLE_COOKIE, data.role)
          dispatch(setIsLoggedIn(true))
        }
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
          {!router.asPath.includes('admin') ? 'Quên mật khẩu' : 'Liên hệ admin để lấy lại mật khẩu'}
        </div>
        {!router.asPath.includes('admin') && (
          <>
            <Input
              ref={usernameRef}
              {...inputStyles({})}
              label="Tên đăng nhập"
              clearable
              onFocus={handleReset}
            />
            <Input
              ref={emailForgotRef}
              {...inputStyles({})}
              label="Email"
              clearable
              onFocus={handleReset}
            />
          </>
        )}
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
            Quay về đăng nhập
          </Button>
          {!router.asPath.includes('admin') && (
            <Button onClick={handleForgot} disabled={isLoginLoading}>
              {isLoginLoading ? <Loading /> : <>Quên mật khẩu</>}
            </Button>
          )}
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
        Đăng nhập
      </div>
      <Input
        ref={emailRef}
        {...inputStyles({ error: error?.result.loginName && translate(error.result.loginName) })}
        label="Tên đăng nhập"
        clearable
        onFocus={handleReset}
      />
      <Input
        ref={passwordRef}
        {...inputStyles({
          error: error?.result.loginPassword && translate(error.result.loginPassword),
        })}
        type="password"
        label="Mật khẩu"
        clearable
        onFocus={handleReset}
      />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button styleType="light" onClick={() => setStep('forgot')} disabled={isLoginLoading}>
          Quên mật khẩu?
        </Button>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          gap: 10,
        }}
      >
        {isEndUser && <Button onClick={() => router.push('/register')}>Đăng ký</Button>}
        <Button onClick={handleLogin} disabled={isLoginLoading}>
          {isLoginLoading ? <Loading /> : <>Đăng nhập</>}
        </Button>
      </div>
    </>
  )
}
