import { Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { setReloadCrt } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { ImageResponse } from '@/types/image'
import Image from 'next/image'
import { CSSProperties, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const itemStyle: CSSProperties = {
  minHeight: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const ProductCart = ({
  item,
  setReloadCart,
}: {
  item: { id: string; qty: number; size: 'M' | 'S' | 'L' }
  setReloadCart: (val: boolean) => void
}) => {
  const imageResult = useApiCall<ImageResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.image.imageInfo,
        params: {
          objectId: item.id,
        },
      }),
    preventLoadingGlobal: true,
  })

  const dispatch = useDispatch()

  const goods = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '1',
          goodsId: item.id || '',
          keySort: 'desc',
          sortField: 'goodsId',
        },
      }),
    handleSuccess(message) {
      if (message) imageResult.setLetCall(true)
    },
    handleError(status, message) {
      toast.error(message)
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    if (item.id) {
      goods.setLetCall(true)
    }
  }, [item])

  const handleRemoveFromCart = () => {
    if (item.id && typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const productList: {
          id: string
          qty: number
          size: string
        }[] = JSON.parse(cart)
        const findItem = productList.find((itemLocal) => item.id === itemLocal.id)
        if (findItem) {
          const newList = productList.filter((thisItem) => thisItem.id !== item.id)
          localStorage.setItem('cart', JSON.stringify(newList))
        }
      }
      dispatch(setReloadCrt(true))
      setReloadCart(true)
    }
  }

  if (goods.loading)
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gridColumn: 'span 8 / span 8',
          alignItems: 'center',
        }}
      >
        <Loading size={50} />
      </div>
    )

  return (
    <>
      <div
        onClick={handleRemoveFromCart}
        style={{ cursor: 'pointer', gridColumn: 'span 1 / span 1', ...itemStyle }}
      >
        <AiFillCloseCircle size={20} color={themeValue.dark.colors.redHighland} />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1', ...itemStyle }}>{item.qty}</div>
      <div
        style={{
          gridColumn: 'span 1 / span 1',
          ...itemStyle,
        }}
      >
        {imageResult.loading ? (
          <Loading size={20} />
        ) : (
          imageResult.data && (
            <Image
              src={`${imageResult.data?.result.prefix}${imageResult.data?.result.base64}`}
              width={60}
              height={60}
            />
          )
        )}
      </div>
      <div style={{ gridColumn: 'span 1 / span 1', ...itemStyle }}>{item.size}</div>
      <div
        style={{
          overflow: 'hidden',
          maxWidth: '150px',
          gridColumn: 'span 2 / span 2',
          ...itemStyle,
          justifyContent: 'start',
        }}
      >
        {goods.data?.result.data[0]?.name}
      </div>
      <div
        style={{
          gridColumn: 'span 2 / span 2',
          ...itemStyle,
        }}
      >
        {goods.data?.result.data[0]?.applyPrice}
      </div>
    </>
  )
}
