import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { RequestBranchRequest, RequestFailure } from '@/types/request/request'
import { RequestCreateResponse, RequestDetailResponse } from '@/types/requestDetail/requestDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IRequestForm {
  requestBody: RequestCreateResponse
  request: RequestBranchRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  type1: 'read' | 'update'
  errorState?: Partial<RequestFailure>
  selectGoods?: string
}

export const RequestBranchForm = ({
  request,
  onchangeUserState,
  type,
  type1,
  errorState,
  selectGoods,
  requestBody,
}: IRequestForm) => {
  const router = useRouter()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const [selectId, setSelectId] = useState<string[]>(selectGoods ? [selectGoods] : [''])
  const id = router?.query?.id?.toString()

  const requestIdLabel = useTranslation('requestId')
  const branchIdLabel = useTranslation('branchId')
  const createdByLabel = useTranslation('createdBy')
  const createdDateLabel = useTranslation('createdDate')
  const totalPriceLabel = useTranslation('totalPrice')
  const statusLabel = useTranslation('status')
  const GoodsIdLabel = useTranslation('goodsId')
  const QuantityLabel = useTranslation('quantity')

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
  const result1 = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoodsByAuthorized,
        token: cookies.token,
        params: { page: String(page), sortField: 'goodsId', isTransfer: '1' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = result

  useEffect(() => {
    result1.setLetCall(true)
    setLetCall(true)
  }, [page])

  useEffect(() => {
    if (selectId.length) {
      onchangeUserState({
        goodsId: selectId[0],
      })
    } else {
      onchangeUserState({
        goodsId: '',
      })
    }
  }, [selectId])
  const dataListGoodField: ViewPointType[] = [
    {
      key: 'goodsId',
      label: 'goodsId',
    },
    {
      key: 'name',
      label: 'name',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
  ]

  const dataField: ViewPointType[] = [
    {
      key: 'goodsName',
      label: 'goodsName',
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
        {!router.query.id && (
          <>
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
          </>
        )}
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

      {type === 'update' ? (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
              gap: 16,
            }}
          >
            <div>
              <Input
                readOnly
                value={requestBody.goodsId}
                label={GoodsIdLabel}
                onChange={() => {}}
                {...inputStyles({
                  error: errorState?.branchId && translate(errorState.branchId),
                })}
              />
            </div>
            <div>
              <Input
                label={QuantityLabel}
                value={requestBody.quantity}
                onChange={(event) => {
                  onchangeUserState({
                    quantity: event.currentTarget.value,
                  })
                }}
                {...inputStyles({
                  error: errorState?.branchId && translate(errorState.branchId),
                })}
              />
            </div>
          </div>
          <CustomTable
            idFiled="goodsId"
            detailPath="admin/good/"
            header={dataListGoodField ?? []}
            body={
              result1.data
                ? result1?.data?.result?.data.map((user) => {
                    return { ...user, status: user.status === 1 ? 'active' : 'deactivate' }
                  })
                : []
            }
            selectionMode={type1 === 'read' ? 'none' : 'single'}
            selectedKeys={selectId}
            loading={loading}
            handleChangeSelection={setSelectId}
          >
            <>{null}</>
          </CustomTable>
          {!loading && (
            <Pagination
              total={result1?.data?.result?.totalRows ?? 0}
              onChange={(number) => setPage(number)}
              page={page}
              paginationStyle={{ marginTop: 20 }}
            />
          )}
        </div>
      ) : (
        <div>
          <CustomTable
            listActions={[]}
            idFiled="requestId"
            detailPath="admin/request-branch/"
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
        </div>
      )}
    </>
  )
}
