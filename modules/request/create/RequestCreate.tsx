import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'

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

  const [request, setRequest] = useState<RequestCreateResponse[]>([])

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

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/request-branch/management')
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Tạo lý yêu cầu</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Tạo lý yêu cầu</h2>
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
          request={request}
          onchangeUserState={setRequest}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
