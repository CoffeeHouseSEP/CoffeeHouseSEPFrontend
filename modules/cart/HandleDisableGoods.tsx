import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ProductCart } from './ProductCart'

export const HandleDisableGoods = ({
  cart,
  branchId,
  setReloadCart,
  setDisableOrder,
}: {
  cart: { id: string; qty: number; size: 'M' | 'S' | 'L' }[]
  branchId: string
  setReloadCart: (val: boolean) => void
  setDisableOrder: (val: boolean) => void
}) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getDisableGoods = useApiCall<CommonListResultType<{ goodsId: string }>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.disableGoodsBranch.getListDisable,
        params: {
          branchId,
        },
      }),
    handleError(message) {
      toast.error(message)
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    if (cart && cart.length && branchId) {
      getDisableGoods.setLetCall(true)
    }
  }, [branchId, cart])

  const listDisable = getDisableGoods.data?.result.data

  const findDisable = cart.filter((item) => {
    if (listDisable?.find((thisDis) => thisDis.goodsId === item.id)) return true
    return false
  })

  useEffect(() => {
    if (findDisable.length > 0) {
      setDisableOrder(true)
    } else {
      setDisableOrder(false)
    }
  }, [findDisable])

  return (
    <>
      {findDisable.length > 0 && (
        <>
          <div
            style={{
              marginTop: 30,
              fontWeight: 600,
              color: themeValue[darkTheme].colors.redHighland,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            SẢN PHẨM TRONG GIỎ HÀNG CỦA BẠN KHÔNG CÓ SẴN TẠI CHI NHÁNH ĐÃ CHỌN
          </div>
          <div style={{ marginTop: 10 }}>
            Các sản phẩm không có sẵn:
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
              {findDisable.map((item) => (
                <ProductCart item={item} setReloadCart={setReloadCart} />
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: 30,
              fontWeight: 600,
              color: themeValue[darkTheme].colors.redHighland,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            VUI LÒNG LOẠI BỎ SẢN PHẨM HOẶC CHỌN CHI NHÁNH KHÁC
          </div>
        </>
      )}
    </>
  )
}
