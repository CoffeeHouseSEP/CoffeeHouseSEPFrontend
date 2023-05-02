/* eslint-disable react-hooks/rules-of-hooks */
import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { VND, themeValue } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { RequestBranchRequest, RequestFailure } from '@/types/request/request'
import { RequestCreateResponse } from '@/types/requestDetail/requestDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IRequestForm {
  requestBody: RequestCreateResponse[]
  request: RequestBranchRequest
  onchangeUserState: Function
  onchangeListState: (value: RequestCreateResponse[]) => void
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
  onchangeListState,
  errorState,
  requestBody,
}: IRequestForm) => {
  const router = useRouter()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)

  const requestIdLabel = useTranslation('requestId')
  const branchIdLabel = useTranslation('branchId')
  const createdByLabel = useTranslation('createdBy')
  const createdDateLabel = useTranslation('createdDate')
  const totalPriceLabel = useTranslation('totalPrice')
  const statusLabel = useTranslation('status')

  const result = useApiCall<CommonListResultType<GoodsResponse>, String>({
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
    setLetCall(true)
  }, [page])

  const inputItem = (data: { [key: string]: any }) => {
    const item = data as RequestCreateResponse
    return (
      <Input
        labelLeft="SL"
        disabled={!requestBody.find((thisItem) => thisItem.goodsId === item.goodsId)}
        value={requestBody.find((thisItem) => thisItem.goodsId === item.goodsId)?.quantity || ''}
        onChange={(e) => {
          if (e.target.value && Number.isFinite(Number(e.target.value))) {
            let newList: RequestCreateResponse[] = []
            newList = requestBody.map((itemThis) => {
              if (itemThis.goodsId === item.goodsId)
                return { ...itemThis, quantity: Number(e.target.value) }
              return itemThis
            })
            onchangeListState(newList)
          }
          if (!e.target.value) {
            let newList: RequestCreateResponse[] = []
            newList = requestBody.map((itemThis) => {
              if (itemThis.goodsId === item.goodsId) return { ...itemThis, quantity: 0 }
              return itemThis
            })
            onchangeListState(newList)
          }
        }}
      />
    )
  }

  const dataField: ViewPointType[] = [
    {
      key: 'name',
      label: 'goodsName',
    },
    {
      key: 'categoryName',
      label: 'categoryName',
    },
    {
      key: 'innerPrice',
      label: 'innerPrice',
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

      {type === 'update' && (
        <>
          <CustomTable
            listActions={[
              {
                content: 'string',
                icon: inputItem,
                func: () => {},
              },
            ]}
            idFiled="goodsId"
            detailPath="admin/goods/"
            header={dataField ?? []}
            body={
              data
                ? data.result.data.map((user) => {
                    return { ...user, innerPrice: VND.format(user.applyPrice) }
                  })
                : []
            }
            selectionMode={type1 === 'read' ? 'none' : 'multiple'}
            selectedKeys={requestBody.map((item) => item.goodsId)}
            loading={loading}
            handleChangeSelection={(value: string[]) => {
              let newList: RequestCreateResponse[] = []
              value.forEach((select) => {
                const thisF = requestBody.find((da) => da.goodsId === select)
                if (thisF) {
                  newList = [...newList, thisF]
                } else {
                  newList = [
                    ...newList,
                    {
                      goodsId: select,
                      quantity: 1,
                      applyPrice:
                        result.data?.result.data.find((da) => da.goodsId === select)?.innerPrice ||
                        0,
                    },
                  ]
                }
              })
              onchangeListState(newList)
            }}
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
          {Object.keys(errorState || {}).map((item) => {
            if (errorState && errorState[item as keyof typeof errorState]) {
              return (
                <div
                  style={{
                    marginTop: 30,
                    fontSize: '20px',
                    paddingLeft: '4px',
                    color: themeValue.dark.colors.redHighland,
                  }}
                >
                  {errorState[item as keyof typeof errorState]}
                </div>
              )
            }
            return ''
          })}
        </>
      )}
    </>
  )
}
