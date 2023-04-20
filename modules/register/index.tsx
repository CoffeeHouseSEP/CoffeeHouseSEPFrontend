import { Button, Input, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { inputStyles } from '@/inventory'
import { encodeBase64, themeValue } from '@/lib'
import { authenticationSelector, setLoading } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export interface RegisterRequest {
  registerName: string
  registerPassword: string
  email: string
  fullName: string
}

export type RegisterFailure = Record<keyof RegisterRequest, string>

export const RegisterFrom = () => {
  const router = useRouter()
  const registerName = useRef<HTMLInputElement>(null)
  const registerPassword = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { isLoginLoading } = useSelector(authenticationSelector)
  const dispatch = useDispatch()

  const result = useApiCall<RegisterRequest, RegisterFailure>({
    callApi: () =>
      postMethod<RegisterRequest>({
        pathName: apiRoute.user.register,
        request: {
          registerName: registerName.current?.value || '',
          registerPassword: encodeBase64(registerPassword.current?.value || ''),
          email: emailRef.current?.value || '',
          fullName: fullNameRef.current?.value || '',
        },
      }),
    handleSuccess(message) {
      dispatch(setLoading(false))
      router.push('/login')
      toast.success(message)
    },
    handleError(status, message) {
      if (status) {
        dispatch(setLoading(false))
        toast.error(message)
      }
    },
    preventLoadingGlobal: true,
  })

  const { error, setLetCall } = result

  const handleLogin = () => {
    setLetCall(true)
    dispatch(setLoading(true))
  }

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
        Đăng ký
      </div>
      <Input
        ref={registerName}
        {...inputStyles({ error: error?.result.registerName })}
        label="Tên đăng nhập"
        clearable
      />
      <Input
        ref={registerPassword}
        {...inputStyles({
          error: error?.result.registerPassword,
        })}
        type="password"
        label="Mật khẩu"
        clearable
      />
      <Input
        ref={fullNameRef}
        {...inputStyles({
          error: error?.result.fullName,
        })}
        label="Tên đầy đủ"
        clearable
      />
      <Input
        ref={emailRef}
        {...inputStyles({
          error: error?.result.email,
        })}
        label="Email"
        clearable
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          gap: 10,
        }}
      >
        <Button onClick={() => router.push('/login')}>Đăng nhập</Button>
        <Button onClick={handleLogin} disabled={isLoginLoading}>
          {isLoginLoading ? <Loading /> : <>Đăng ký</>}
        </Button>
      </div>
    </>
  )
}
