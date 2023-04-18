import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setReloadCrt } from '@/redux/share-store'
import { postMethod } from '@/services'
import { OrderFailure, OrderRequest } from '@/types/order/order'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { CartGeneralInfo } from './CartGeneralInfo'
import { CouponCart } from './CouponCart'
import { HandleDisableGoods } from './HandleDisableGoods'
import { ProductCart, itemStyle } from './ProductCart'

export const CartContainer = () => {
  const [cart, setCart] = useState<{ id: string; qty: number; size: 'M' | 'S' | 'L' }[]>([])
  const [reloadCart, setReloadCart] = useState<boolean>(true)
  const [order, setOrder] = useState<OrderRequest>({
    branchId: '',
    address: '',
    province: '',
    ward: '',
    district: '',
    couponId: '',
    listOrderDetail: [],
  })
  const [couponSelect, setCouponSelect] = useState<{ maxApply: number; value: number }>({
    maxApply: 0,
    value: 0,
  })

  const { isLoggedIn } = useSelector(authenticationSelector)

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const pixel = useResponsive()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    if (reloadCart && typeof window !== 'undefined') {
      const cartLocal = localStorage.getItem('cart')
      if (cartLocal) {
        const list: { id: string; qty: number; size: 'M' | 'S' | 'L' }[] = JSON.parse(cartLocal)
        setCart(list)
      } else {
        setCart([])
      }
      setReloadCart(false)
    }
  }, [reloadCart])

  const onChangeOrder = (value: Partial<OrderRequest>) => {
    setOrder({ ...order, ...value })
  }

  const dispatch = useDispatch()

  const takeOrder = useApiCall<String, OrderFailure>({
    callApi: () =>
      postMethod({ pathName: apiRoute.order.createOrder, token: cookies.token, request: order }),
    handleSuccess() {
      localStorage.setItem('cart', JSON.stringify([]))
      setOrderSuccess(true)
      dispatch(setReloadCrt(true))
    },
    handleError(status, message) {
      if (status !== 400) {
        toast.error(message)
      }
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    const listInfo = cart.map((item) => {
      return {
        goodsId: item.id,
        quantity: item.qty,
        size: item.size,
      }
    })
    onChangeOrder({ listOrderDetail: listInfo })
  }, [cart, reloadCart])

  const router = useRouter()

  useEffect(() => {
    onChangeOrder({ branchId: '' })
  }, [order.district, order.province, order.ward])

  if (orderSuccess) {
    return (
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
        }}
      >
        <div
          style={{
            marginTop: 80,
            backgroundColor: themeValue[darkTheme].colors.success,
            borderRadius: '100%',
            width: 150,
            aspectRatio: '1 / 1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BsFillCartCheckFill size={80} color={themeValue[darkTheme].colors.background} />
        </div>
        <strong style={{ color: themeValue[darkTheme].colors.redHighland }}>
          ĐẶT HÀNG THÀNH CÔNG
        </strong>
        <Button onClick={() => router.push('/goods/listgoods')}>TIẾP TỤC MUA SẮM</Button>
      </div>
    )
  }
  return (
    <>
      {!cart.length ? (
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
              marginTop: 80,
              backgroundColor: themeValue[darkTheme].colors.redHighland,
              borderRadius: '100%',
              width: 150,
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AiOutlineShoppingCart size={80} color={themeValue[darkTheme].colors.background} />
          </div>
          <strong style={{ color: themeValue[darkTheme].colors.redHighland }}>
            KHÔNG CÓ SẢN PHẨM
          </strong>
          <Button onClick={() => router.push('/goods/listgoods')}>TIẾP TỤC MUA SẮM</Button>
        </div>
      ) : (
        <>
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
            <HandleDisableGoods
              onChangeOrder={onChangeOrder}
              setReloadCart={setReloadCart}
              cart={cart}
              branchId={order.branchId}
            />
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
                  Đơn gía
                </div>
                {cart.map((item) => (
                  <ProductCart setReloadCart={setReloadCart} item={item} />
                ))}
              </div>
            </div>
            <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
              <CouponCart
                setCouponSelect={setCouponSelect}
                order={order}
                onChangeOrder={onChangeOrder}
                cartInfo={order.listOrderDetail}
              />
            </div>
          </div>
          <div
            style={{
              width: '100%',
              minHeight: '100%',
              maxWidth: 1024,
              margin: pixel >= 1000 ? 'auto' : '10px 20px',
            }}
          >
            <CartGeneralInfo
              coupon={couponSelect}
              order={order}
              onChangeOrder={onChangeOrder}
              item={cart}
              error={takeOrder.error?.result}
            />
          </div>
          <div
            style={{
              gridColumn: 'span 2 / span 2',
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled={takeOrder.loading}
              style={{
                width: 300,
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => {
                if (isLoggedIn) {
                  takeOrder.setLetCall(true)
                } else {
                  toast.warn('Bạn phải đăng nhập để đặt hàng')
                }
              }}
            >
              {takeOrder.loading ? <Loading /> : 'Đặt hàng'}
            </Button>
          </div>
        </>
      )}
    </>
  )
}
