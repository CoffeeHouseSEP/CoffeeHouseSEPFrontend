import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultUserRequest } from '@/inventory'
import { UserForm } from '@/inventory/UserForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { UserRequest, UserRequestFailure } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from './inventory/FloatTrayCreate'

export const UserCreate = () => {
  const [user, setUser] = useState<UserRequest>(DefaultUserRequest)

  const translate = useTranslationFunction()

  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()

  const createResult = useApiCall<UserRequest, UserRequestFailure>({
    callApi: () =>
      postMethod<UserRequest>({
        pathName: apiRoute.user.addUser,
        token: cookies.token,
        request: user,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/user/management')
    },
  })

  const { breakPoint } = useSelector(ShareStoreSelector)

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/user/management')
  }

  const onchangeUserState = (newUpdate: Partial<UserRequest>) => {
    const newUserState = { ...user }
    setUser({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Tạo quản lý</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Tạo quản lý</h2>
        {breakPoint > 1 ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <Button color="primary" onClick={callCreate} disabled={createResult.loading}>
              {createResult.loading ? <Loading /> : <>{saveLabel}</>}
            </Button>
            <Button color="warning" onClick={directManagement} disabled={createResult.loading}>
              {cancelLabel}
            </Button>
          </div>
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )}
      </div>
      <UserForm
        user={user}
        onchangeUserState={onchangeUserState}
        type="update"
        errorState={createResult.error?.result}
      />
    </>
  )
}
