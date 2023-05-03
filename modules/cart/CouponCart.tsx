import { CustomTable, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { VND, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { postMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { CouponResponse } from '@/types/coupon'
import { OrderRequest } from '@/types/order/order'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { RiCoupon2Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'

export const CouponCart = ({
  cartInfo,
  order,
  onChangeOrder,
  setCouponSelect,
}: {
  cartInfo: {
    goodsId: string
    quantity: number
    size: 'S' | 'M' | 'L'
  }[]
  order: OrderRequest
  onChangeOrder: (value: Partial<OrderRequest>) => void
  setCouponSelect: (value: { maxApply: number; value: number }) => void
}) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getCoupon = useApiCall<CommonListResultType<CouponResponse>, String>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.coupon.getCouponForCart,
        request: cartInfo,
        token: cookies.token,
      }),
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    if (cartInfo && cartInfo.length > 0 && cookies.token) {
      getCoupon.setLetCall(true)
    }
  }, [cartInfo])

  const dataField: ViewPointType[] = [
    {
      key: 'code',
      label: 'couponCOde',
    },
    {
      key: 'expiredDate',
      label: 'expiredDateCoupon',
    },
    {
      key: 'value',
      label: 'percentCoupon',
    },
    {
      key: 'maxValuePromotion',
      label: 'maxValuePromotion',
    },
  ]

  useEffect(() => {
    if (order.couponId) {
      const find = getCoupon.data?.result.data.find((cou) => cou.couponId === order.couponId)
      if (find) {
        setCouponSelect({
          maxApply: find.maxValuePromotion,
          value: find.value,
        })
      }
    } else {
      setCouponSelect({
        maxApply: 0,
        value: 0,
      })
    }
  }, [order.couponId])

  return (
    <>
      <h3>Mã giảm giá</h3>
      {getCoupon.loading && <Loading />}
      {!getCoupon.loading &&
        getCoupon.data?.result.data &&
        getCoupon.data?.result.data.length > 0 && (
          <CustomTable
            selectionMode="single"
            selectedKeys={[order.couponId]}
            handleChangeSelection={(value: string[]) => {
              onChangeOrder({ couponId: value[0] })
            }}
            listActions={[]}
            idFiled="couponId"
            detailPath="admin/branch/"
            header={dataField ?? []}
            body={getCoupon.data?.result.data.map((item) => {
              return {
                ...item,
                expiredDate: item.expiredDate,
                value: `${item.value}%`,
                maxValuePromotion: VND.format(item.maxValuePromotion),
              }
            })}
            loading={getCoupon.loading}
          >
            <>{null}</>
          </CustomTable>
        )}
      {!getCoupon.loading &&
        (!getCoupon.data?.result.data || getCoupon.data?.result.data.length === 0) && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div>
              <RiCoupon2Fill size={50} color={themeValue[darkTheme].colors.redHighland} />
            </div>{' '}
            <div style={{ color: themeValue[darkTheme].colors.redHighland, fontWeight: 550 }}>
              Không có mã giảm giá phù hợp
            </div>
          </div>
        )}
    </>
  )
}
