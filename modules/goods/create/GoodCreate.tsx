import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaulRequesttGood } from '@/inventory'
import { GoodForm } from '@/inventory/ProductForm'

import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { GoodRequest, GoodRequestFailure } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function GoodCreate() {
  // const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const [goodState, setGoodState] = useState<GoodRequest>(DefaulRequesttGood)

  const createResult = useApiCall<GoodRequest, GoodRequestFailure>({
    callApi: () =>
      postMethod<GoodRequest>({
        pathName: apiRoute.goods.createGood,
        // token: cookies.token,
        token:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODAwOTMyOTAsInVzZXJJZCI6ImUwYjc2OWRjLWZkODMtNGE2MC1iODllLTgwNzNiMTk4MzkyOSJ9.LGCQPKz6YXeLldmZbvnj2iIdDhry15HupI2fIBlWHWVNl7EjH5jWuMdpAC9cBguRrOpDa6hCPRy594GikrX81A',
        request: goodState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/good/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<GoodRequest>) => {
    const newUserState = { ...goodState }
    setGoodState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/good/management')
  }
  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {/* {breakPoint > 1 ? (
     
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )} */}
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button color="primary" onClick={callCreate} disabled={createResult.loading}>
            {createResult.loading ? <Loading /> : <>{saveLabel}</>}
          </Button>
          <Button color="warning" onClick={directManagement} disabled={createResult.loading}>
            {cancelLabel}
          </Button>
        </div>
      </div>
      <div style={{ paddingTop: 40 }}>
        <GoodForm
          type="update"
          good={goodState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
