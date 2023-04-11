import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { RequestBranchRequest, RequestFailure } from '@/types/request/request'
import { RequestDetailResponse } from '@/types/requestDetail/requestDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IRequestForm {
  request: RequestBranchRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<RequestFailure>
}

export const RequestBranchForm = ({
  request,
  onchangeUserState,
  type,
  errorState,
}: IRequestForm) => {
  const router = useRouter()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const id = router?.query?.id?.toString()

  const requestIdLabel = useTranslation('requestId')
  const branchIdLabel = useTranslation('branchId')
  const createdByLabel = useTranslation('createdBy')
  const createdDateLabel = useTranslation('createdDate')
  const totalPriceLabel = useTranslation('totalPrice')
  const statusLabel = useTranslation('status')

  const result = useApiCall<CommonListResultType<RequestDetailResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.request.requestDetailRequest,
        token: cookies.token,
        params: { page: String(page), requestId: id || '' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = result
  useEffect(() => {
    setLetCall(true)
  }, [page])
  const dataField: ViewPointType[] = [
    {
      key: 'requestDetailId',
      label: 'requestDetailId',
    },
    {
      key: 'requestId',
      label: 'requestId',
    },
    {
      key: 'goodsId',
      label: 'goodsId',
    },
    {
      key: 'quantity',
      label: 'quantity',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
  ]
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
          gap: 16,
        }}
      >
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly
            value={request.requestId}
            label={requestIdLabel}
            onChange={(event) => {
              onchangeUserState({
                requestId: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.requestId && translate(errorState.requestId),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly
            value={request.branchId}
            label={branchIdLabel}
            onChange={(event) => {
              onchangeUserState({
                branchId: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.branchId && translate(errorState.branchId),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly
            value={request.createdBy}
            label={createdByLabel}
            onChange={(event) => {
              onchangeUserState({
                createdBy: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.createdBy && translate(errorState.createdBy),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={request.totalPrice}
            label={totalPriceLabel}
            onChange={(event) => {
              onchangeUserState({
                totalPrice: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.totalPrice && translate(errorState.totalPrice),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly
            value={request.createdDate}
            label={createdDateLabel}
            onChange={(event) => {
              onchangeUserState({
                createdDate: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.createdDate && translate(errorState.createdDate),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly
            value={request.status}
            label={statusLabel}
            onChange={(event) => {
              onchangeUserState({
                status: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.status && translate(errorState.status),
            })}
          />
        </div>
      </div>
      <CustomTable
        idFiled="requestId"
        detailPath="admin/request/"
        header={dataField ?? []}
        body={data?.result.data ? data?.result.data : []}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
