import { Button, CustomTable, Loading, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive } from '@/hooks'
import { VND, themeValue } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { setReloadCrt } from '@/redux/share-store'
import { getMethod, postMethod } from '@/services'
import { CommonListResultType, ProfileResponse, ViewPointType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
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
  const { isLoggedIn } = useSelector(authenticationSelector)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const [disableOrder, setDisableOrder] = useState(false)

  const [order, setOrder] = useState<OrderRequest>({
    branchId: '',
    address: '',
    province: '',
    ward: '',
    district: '',
    couponId: '',
    description: '',
    listOrderDetail: [],
    phoneNumber: '',
  })

  const viewResult = useApiCall<ProfileResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.profile.getProfile,
        token: cookies.token,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    handleSuccess(message, data) {
      setOrder({ ...order, phoneNumber: data.phoneNumber })
    },
    preventLoadingGlobal: true,
  })

  const [couponSelect, setCouponSelect] = useState<{ maxApply: number; value: number }>({
    maxApply: 0,
    value: 0,
  })

  const pixel = useResponsive()
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const [total, setTotal] = useState<
    {
      qty: number
      unitPrice: number
    }[]
  >([])

  const getTotalPrice = () => {
    let priceTotal = 0
    for (let i = 0; i < total.length; i += 1) {
      priceTotal += total[i].qty * total[i].unitPrice
    }
    return priceTotal
  }

  const getPrice = async (id: string) => {
    setLoading(true)
    try {
      const res = await getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '1',
          goodsId: id,
          keySort: 'desc',
          sortField: 'goodsId',
        },
      })
      return res?.data?.result.data[0]?.applyPrice || 0
    } catch (err: any) {
      return 0
    } finally {
      setLoading(false)
    }
  }

  const getSizeUp = async (size: 'S' | 'M' | 'L') => {
    if (size === 'S') return 1
    setLoading(true)
    try {
      const res = await getMethod({
        pathName: apiRoute.appParams.getAppPrams,
        params: {
          parType: 'UPSIZE_GOODS',
        },
      })
      const result = res?.data?.result.data.find((item: any) => item.name === size)
      return result ? parseFloat(result.code) : 1
    } catch (err: any) {
      return 1
    } finally {
      setLoading(false)
    }
  }

  const getTotal = async () => {
    const result = await Promise.all(
      cart.map(async (pro) => {
        const priceSize = await getSizeUp(pro.size)
        const unitPrice = await getPrice(pro.id)
        return {
          qty: pro.qty,
          unitPrice: Math.round(priceSize * unitPrice),
        }
      })
    )
    setTotal(result)
  }

  useEffect(() => {
    if (cart.length) {
      getTotal()
      viewResult.setLetCall(true)
    }
  }, [cart])

  const getTotalCart = () => {
    if (couponSelect.maxApply && couponSelect.value) {
      const discount = Math.round((getTotalPrice() * couponSelect.value) / 100)
      if (discount > couponSelect.maxApply)
        return Math.round(getTotalPrice()) - couponSelect.maxApply
      return Math.round(getTotalPrice()) - discount
    }
    return Math.round(getTotalPrice())
  }

  const [page, setPage] = useState<number>(1)

  const dataField: ViewPointType[] = [
    {
      key: 'name',
      label: 'nameBranch',
    },
    {
      key: 'phoneNumber',
      label: 'phoneNumberBranch',
    },
  ]

  let paramBr = {}

  if (order.province) {
    paramBr = { ...paramBr, province: order.province }
  }

  if (order.district) {
    paramBr = { ...paramBr, district: order.district }
  }

  if (order.ward) {
    paramBr = { ...paramBr, ward: order.ward }
  }

  const resultBranch = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
        params: {
          page: String(page),
          pageSize: '10',
          ...paramBr,
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    preventLoadingGlobal: true,
  })
  const { data, setLetCall } = resultBranch
  useEffect(() => {
    if (order.province && order.district) {
      setLetCall(true)
    }
  }, [page, order.province, order.district, order.ward])

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
                  SL
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
                {cart.map((item) => (
                  <ProductCart setReloadCart={setReloadCart} item={item} />
                ))}
              </div>
              <div style={{ ...itemStyle, justifyContent: 'start' }}>
                Tổng giá trị đơn hàng:
                <span style={{ marginLeft: 10 }}>
                  {loading ? <Loading size={40} /> : <strong>{VND.format(getTotalCart())}</strong>}
                </span>
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
            <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
              <CartGeneralInfo
                order={order}
                onChangeOrder={onChangeOrder}
                error={takeOrder.error?.result}
              />
            </div>
            <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
              {order.province && !resultBranch.loading && (
                <>
                  <h3 style={{ marginTop: 10 }}>Chọn cửa hàng</h3>
                  <CustomTable
                    selectionMode="single"
                    selectedKeys={[order.branchId]}
                    handleChangeSelection={(value: string[]) => {
                      onChangeOrder({ branchId: value[0] })
                    }}
                    idFiled="branchId"
                    detailPath="admin/branch/"
                    header={dataField ?? []}
                    listActions={[]}
                    body={
                      data
                        ? data.result.data.map((cate) => {
                            return { ...cate, status: cate.status === 1 ? 'active' : 'deactivate' }
                          })
                        : []
                    }
                  >
                    <>{null}</>
                  </CustomTable>
                  <HandleDisableGoods
                    setReloadCart={setReloadCart}
                    cart={cart}
                    branchId={order.branchId}
                    setDisableOrder={setDisableOrder}
                  />
                </>
              )}
              {resultBranch.loading && <Loading />}
              {order.province && !resultBranch.loading && (
                <Pagination
                  pageSize={10}
                  total={data?.result?.totalRows ?? 0}
                  onChange={(number) => setPage(number)}
                  page={page}
                  paginationStyle={{ marginTop: 20 }}
                />
              )}
              <div
                style={{ color: themeValue.dark.colors.redHighland, fontWeight: 500, padding: 10 }}
              >
                {takeOrder.error?.result.branchId}
              </div>
            </div>
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
              disabled={takeOrder.loading || disableOrder}
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
