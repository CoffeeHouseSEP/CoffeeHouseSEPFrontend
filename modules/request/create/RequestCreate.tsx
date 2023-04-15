import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultCreateRequest, DefaultListDetail } from '@/inventory'

import { RequestCreateBranchForm } from '@/inventory/RequestCreateBranchForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { RequestCreateBranchRequest, RequestFailure } from '@/types/request/request'
import { RequestCreateResponse } from '@/types/requestDetail/requestDetail'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from '../inventory/FloatTrailCreate'

export default function RequestCreate() {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const [requestState, setRequestState] = useState<RequestCreateResponse>(DefaultCreateRequest)
  const [request, setRequest] = useState<RequestCreateResponse[]>(DefaultListDetail)

  const createResult = useApiCall<RequestCreateBranchRequest, RequestFailure>({
    callApi: () =>
      postMethod<RequestCreateBranchRequest>({
        pathName: apiRoute.request.addRequest,
        token: cookies.token,
        request: { listRequestDetail: request },
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/request-branch/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<RequestCreateResponse>) => {
    const newUserState = { ...requestState }
    setRequestState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const confirmLabel = useTranslation('Confirm')

  const callCreate = () => {
    createResult.setLetCall(true)
  }
  const confirmChoice = () => {
    setRequest([
      ...request.filter((item) => item.goodsId !== requestState.goodsId && item.goodsId !== ''),
      requestState,
    ])
    setRequestState(DefaultCreateRequest)
    toast.info('Selected goods successfully!')
  }

  const directManagement = () => {
    router.push('/admin/request-branch/management')
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
        {breakPoint > 1 ? (
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
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )}
      </div>
      <div style={{ paddingTop: 40 }}>
        <RequestCreateBranchForm
          type="update"
          request={requestState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
      <div style={{ float: 'right' }}>
        <Button color="primary" onClick={confirmChoice} disabled={createResult.loading}>
          {createResult.loading ? <Loading /> : <>{confirmLabel}</>}
        </Button>
      </div>
    </div>
  )
}
