import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { OrderFailure, OrderRequest } from '@/types/order/order'
import { OrderDetailResponse } from '@/types/orderDetail/orderDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IOrderForm {
  order: OrderRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<OrderFailure>
}

export const OrderForm = ({ order, onchangeUserState, type, errorState }: IOrderForm) => {
  const router = useRouter()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const id = router?.query?.id?.toString()

  const ordersIdLabel = useTranslation('ordersId')
  const customerIdLabel = useTranslation('customerId')
  const customerNameLabel = useTranslation('customerName')
  const createdDateLabel = useTranslation('createdDate')
  const couponIdLabel = useTranslation('couponId')
  const totalPriceLabel = useTranslation('totalPrice')
  const statusLabel = useTranslation('status')

  const result = useApiCall<CommonListResultType<OrderDetailResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.order.orderDetail,
        token: cookies.token,
        params: { page: String(page), orderId: id || '' },
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
      key: 'orderDetailId',
      label: 'orderDetailId',
    },
    {
      key: 'ordersId',
      label: 'ordersId',
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
    {
      key: 'size',
      label: 'size',
    },
    {
      key: 'goodsName',
      label: 'goodsName',
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
            readOnly={type === 'read'}
            value={order.ordersId}
            label={ordersIdLabel}
            onChange={(event) => {
              onchangeUserState({
                ordersId: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.ordersId && translate(errorState.ordersId),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={order.customerId}
            label={customerIdLabel}
            onChange={(event) => {
              onchangeUserState({
                customerId: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.customerId && translate(errorState.customerId),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={order.customerName}
            label={customerNameLabel}
            onChange={(event) => {
              onchangeUserState({
                createdBy: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.customerName && translate(errorState.customerName),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={order.totalPrice}
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
            readOnly={type === 'read'}
            value={order.couponId}
            label={couponIdLabel}
            onChange={(event) => {
              onchangeUserState({
                couponId: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.couponId && translate(errorState.couponId),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={order.createdDate}
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
            readOnly={type === 'read'}
            value={order.status}
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
