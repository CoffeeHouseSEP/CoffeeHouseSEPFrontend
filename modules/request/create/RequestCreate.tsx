import { Button, CustomTable, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultCreateRequest, DefaultListDetail } from '@/inventory'

import { RequestCreateBranchForm } from '@/inventory/RequestCreateBranchForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { ViewPointType } from '@/types'
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
  const [select, setSelect] = useState<string[]>([])

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

  const deleteLabel = useTranslation('delete')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const confirmChoice = () => {
    if (requestState.goodsId.length > 0) {
      const req = [...request.filter((item) => item.goodsId !== '')]
      if (req.find((item) => item.goodsId === requestState.goodsId)) {
        setRequest([
          ...req.map((item) => {
            if (item.goodsId === requestState.goodsId) {
              return { ...item, quantity: item.quantity + requestState.quantity }
            }
            return item
          }),
        ])
      } else {
        setRequest([...req, requestState])
      }
      setRequestState(DefaultCreateRequest)
      toast.info('Selected goods successfully!')
    } else {
      toast.error('Please select good!')
    }
  }

  const deleteGoodReq = () => {
    const newReq = request.filter((item) => item.goodsId !== select[0])
    setRequest(newReq)
    setSelect([])
    toast.info('deleted!')
  }

  const dataField: ViewPointType[] = [
    {
      key: 'goodsId',
      label: 'goodsId',
    },
    {
      key: 'quantity',
      label: 'quantity',
    },
  ]
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
      <div style={{ fontSize: '25px', fontWeight: 'bold', padding: 20 }}>Goods is Selected:</div>
      <CustomTable
        selectionMode="single"
        listActions={[]}
        idFiled="goodsId"
        detailPath="admin/request/"
        header={dataField ?? []}
        body={request}
        selectedKeys={select}
        handleChangeSelection={setSelect}
      >
        <>{null}</>
      </CustomTable>
      <div style={{ float: 'right', gap: 10, display: 'flex' }}>
        <Button color="warning" onClick={deleteGoodReq} disabled={select.length === 0}>
          {createResult.loading ? <Loading /> : <>{deleteLabel}</>}
        </Button>
        <Button color="primary" onClick={confirmChoice} disabled={createResult.loading}>
          {createResult.loading ? <Loading /> : <>{confirmLabel}</>}
        </Button>
      </div>
    </div>
  )
}
