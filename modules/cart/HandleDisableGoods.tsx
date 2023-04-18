import { Button, Modal } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { OrderRequest } from '@/types/order/order'
import { useEffect, useState } from 'react'
import { BsFillCartXFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const HandleDisableGoods = ({
  cart,
  branchId,
  setReloadCart,
  onChangeOrder,
}: {
  cart: { id: string; qty: number; size: 'M' | 'S' | 'L' }[]
  branchId: string
  setReloadCart: (val: boolean) => void
  onChangeOrder: (value: Partial<OrderRequest>) => void
}) => {
  const [open, setOpen] = useState(false)
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
    } else {
      setOpen(false)
    }
  }, [branchId, cart])

  const listDisable = getDisableGoods.data?.result.data

  const findDisable = cart.filter((item) => {
    if (listDisable?.find((thisDis) => thisDis.goodsId === item.id)) return true
    return false
  })

  useEffect(() => {
    if (cart && cart.length && branchId && findDisable.length) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [findDisable])

  const handleRemoveFromCart = (id: string) => {
    if (id && typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const productList: {
          id: string
          qty: number
          size: string
        }[] = JSON.parse(cart)
        const findItem = productList.find((itemLocal) => id === itemLocal.id)
        if (findItem) {
          const newList = productList.filter((thisItem) => thisItem.id !== id)
          localStorage.setItem('cart', JSON.stringify(newList))
        }
      }
      setReloadCart(true)
    }
  }

  const handleRemoveDisable = () => {
    findDisable.forEach((item) => {
      handleRemoveFromCart(item.id)
    })
  }

  const handleChangeBranch = () => {
    onChangeOrder({
      province: '',
      district: '',
      ward: '',
      branchId: '',
    })
  }

  return (
    <Modal open={open} preventClose>
      <BsFillCartXFill size={80} color={themeValue[darkTheme].colors.redHighland} />
      <div
        style={{
          marginTop: 30,
          fontWeight: 600,
          color: themeValue[darkTheme].colors.redHighland,
        }}
      >
        SẢN PHẨM TRONG GIỎ HÀNG CỦA BẠN KHÔNG CÓ SẴN TẠI CHI NHÁNH ĐÃ CHỌN
      </div>
      <div
        style={{ marginTop: 30, width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Button onClick={handleChangeBranch}>Chọn chi nhánh khác</Button>
        <Button onClick={handleRemoveDisable}>Bỏ sản phẩm</Button>
      </div>
    </Modal>
  )
}
