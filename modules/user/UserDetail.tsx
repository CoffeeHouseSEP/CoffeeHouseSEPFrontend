import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultUserRequest } from '@/inventory'
import { UserForm } from '@/inventory/UserForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { UserRequest, UserRequestFailure, UserResponseSuccess } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from './inventory/FloatTrayDetail'

export const UserDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [user, setUser] = useState<UserRequest>(DefaultUserRequest)
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const breadCrumb = useGetBreadCrumb()

  const viewResult = useApiCall<UserResponseSuccess, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.detailUser,
        token: cookies.token,
        params: {
          field: 'internalUserId',
          value: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      const thisUser = data
      setUser({
        loginName: thisUser.loginName,
        phoneNumber: thisUser.phoneNumber,
        email: thisUser.email,
        address: thisUser.address,
        fullName: thisUser.fullName,
      })
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<UserRequest, UserRequestFailure>({
    callApi: () =>
      putMethod<UserRequest>({
        pathName: apiRoute.user.updateUser,
        token: cookies.token,
        params: { id: id || '' },
        request: user,
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

  useEffect(() => {
    if (!!id) {
      viewResult.setLetCall(true)
    }
  }, [id])

  const onchangeUserState = (newUpdate: Partial<UserRequest>) => {
    const newUserState = { ...user }
    setUser({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  return (
    <>
      <h2>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        {breakPoint > 1 ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button
              color="warning"
              onClick={() => {
                router.push('/admin/user/management')
              }}
            >
              {cancelLabel}
            </Button>
          </div>
        ) : (
          <FloatTrayDetail />
        )}
      </div>
      <div style={{ paddingTop: 20 }}>
        <UserForm
          user={user}
          onchangeUserState={onchangeUserState}
          type="read"
          errorState={updateResult.error?.result}
          isFormUpdate
        />
      </div>
    </>
  )
}
