import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive } from '@/hooks'
import { ParseValueForTable, themeValue } from '@/lib'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { OrderResponse } from '@/types/order/order'
import { OrderDetailResponse } from '@/types/orderDetail/orderDetail'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { itemStyle } from '../cart/ProductCart'
import { ProductCartOrder } from './ProductCartOrder'

export const MyOrderDetail = () => {
  const pixel = useResponsive()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()

  const { id } = router.query

  const itemList = useApiCall<CommonListResultType<OrderDetailResponse>, OrderDetailResponse>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.order.orderDetail,
        token: cookies.token,
        params: {
          orderId: String(id) || '1',
        },
      }),
    preventLoadingGlobal: true,
  })

  const result = useApiCall<CommonListResultType<OrderResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.order.getOrders,
        token: cookies.token,
        params: { page: '1', pageSize: '10', ordersId: String(id) || '' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    if (!!id) {
      itemList.setLetCall(true)
      result.setLetCall(true)
    }
  }, [id])

  const orderDetail = result.data?.result.data[0]

  const parseValue = ParseValueForTable()

  return (
    <div style={{ width: 'max-content', margin: 'auto', marginBottom: 10 }}>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 210px)',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          maxWidth: 1024,
          margin: pixel >= 1000 ? 'auto' : '10px 20px',
          gridColumn: 'span 2 / span 2',
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '100%',
            justifyContent: 'center',
            display: 'grid',
            gridTemplateColumns: `repeat(${pixel >= 1000 ? 2 : 1}, minmax(0, 1fr))`,
            gap: 20,
            maxWidth: 1024,
            margin: pixel >= 1000 ? 'auto' : '10px 20px',
          }}
        >
          <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
            <h3>Sản phẩm</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                gap: 10,
              }}
            >
              <div
                style={{
                  cursor: 'pointer',
                  gridColumn: 'span 1 / span 1',
                  marginBottom: 10,
                  ...itemStyle,
                }}
              />
              <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>
                Qty
              </div>
              <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>
                Ảnh
              </div>
              <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>
                Size
              </div>
              <div
                style={{
                  overflow: 'hidden',
                  maxWidth: '150px',
                  gridColumn: 'span 2 / span 2',
                  marginBottom: 10,
                  ...itemStyle,
                }}
              >
                Tên sản phẩm
              </div>
              <div style={{ gridColumn: 'span 2 / span 2', marginBottom: 10, ...itemStyle }}>
                Đơn giá
              </div>
              {itemList.data?.result.data.length &&
                itemList.data?.result.data.map((item) => <ProductCartOrder item={item} />)}
            </div>
          </div>
          <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
            <h3>Thông tin đơn hàng</h3>
            <div
              style={{
                width: '100%',
                minHeight: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'grid',
                gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
                maxWidth: 1024,
                gap: 3,
                fontWeight: 540,
              }}
            >
              <div style={{ color: themeValue.light.colors.redHighland }}>Tên khách hàng:</div>
              <div>{orderDetail?.customerName}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Số điện thoại:</div>
              <div>{orderDetail?.phoneNumber}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Ngày tạo đơn:</div>
              <div>{orderDetail?.createdDate}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Tổng giá trị:</div>
              <div>{Math.round(orderDetail?.totalPrice || 0)} VND</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Trạng thái:</div>
              <div>{parseValue.status!(orderDetail?.status)}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Mã giảm giá:</div>
              <div>{orderDetail?.couponCode}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Tỉnh / Thành Phố:</div>
              <div>{orderDetail?.province}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Quận / Huyện:</div>
              <div>{orderDetail?.district}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Xã / Phường:</div>
              <div>{orderDetail?.ward}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Địa chỉ:</div>
              <div style={{ overflow: 'hidden' }}>{orderDetail?.address}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Lý do từ chối:</div>
              <div>{orderDetail?.reason}</div>
              <div style={{ color: themeValue.light.colors.redHighland }}>Description:</div>
              <div>{orderDetail?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
