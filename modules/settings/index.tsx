import { Button, Input } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ProfileForm } from '@/inventory/ProfileForm'
import { encodeBase64, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod, postMethod, putMethod } from '@/services'
import { ProfileRequest, ProfileRequestFailure, ProfileResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const Settings = () => {
  const [profile, setProfile] = useState<ProfileRequest>({
    fullName: '',
    loginName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })
  const [password, setPassword] = useState<string>('')
  const [oldPass, setOldPass] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')

  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const translate = useTranslationFunction()

  const viewResult = useApiCall<ProfileResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.profile.getProfile,
        token: cookies.token,
      }),
    handleSuccess: (message, data) => {
      setProfile(data)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<ProfileRequest, ProfileRequestFailure>({
    callApi: () =>
      putMethod<ProfileRequest>({
        pathName: apiRoute.profile.updateProfile,
        token: cookies.token,
        request: profile,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
    },
  })

  const passwordChange = useApiCall<string, string>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.profile.changePass,
        token: cookies.token,
        params: {
          oldPass: encodeBase64(oldPass),
          newPass: encodeBase64(password),
          rePass: encodeBase64(rePassword),
        },
        request: null,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      setPassword('')
    },
  })

  const onChangeProfile = (newUpdate: Partial<ProfileRequest>) => {
    const newUserState = { ...profile }
    setProfile({ ...newUserState, ...newUpdate })
  }

  useEffect(() => {
    viewResult.setLetCall(true)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>Thông tin tài khoản</h2>
      <ProfileForm
        profile={profile}
        errorState={updateResult.error?.result}
        onChangeProfile={onChangeProfile}
      />
      <Button
        style={{ backgroundColor: themeValue[darkTheme].colors.redHighland }}
        onClick={() => updateResult.setLetCall(true)}
      >
        Cập nhật
      </Button>

      <h2 style={{ marginTop: 50 }}>Đổi mật khẩu</h2>
      <div style={{ maxWidth: 375 }}>
        <Input
          type="password"
          label="Mật khẩu cũ"
          value={oldPass}
          onChange={(e) => {
            setOldPass(e.target.value)
          }}
          {...inputStyles({})}
        />
        <Input
          type="password"
          label="Mật khẩu mới"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          {...inputStyles({})}
        />
        <Input
          type="password"
          label="Xác nhận mật khẩu mới"
          value={rePassword}
          onChange={(e) => {
            setRePassword(e.target.value)
          }}
          {...inputStyles({})}
        />
        <Button
          style={{ backgroundColor: themeValue[darkTheme].colors.redHighland }}
          onClick={() => passwordChange.setLetCall(true)}
        >
          Đặt lại mật khẩu
        </Button>
      </div>
    </div>
  )
}
