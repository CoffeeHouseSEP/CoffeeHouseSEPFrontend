import { Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { ImageResponse } from '@/types/image'
import { OrderDetailResponse } from '@/types/orderDetail/orderDetail'
import Image from 'next/image'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { itemStyle } from '../cart/ProductCart'

export const ProductCartOrder = ({ item }: { item: OrderDetailResponse }) => {
  const imageResult = useApiCall<ImageResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.image.imageInfo,
        params: {
          objectId: item.goodsId,
        },
      }),
    preventLoadingGlobal: true,
  })

  const goods = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '1',
          goodsId: item.goodsId || '',
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
    if (item.goodsId) {
      goods.setLetCall(true)
    }
  }, [item])

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
      <div style={{ cursor: 'pointer', gridColumn: 'span 1 / span 1', ...itemStyle }} />
      <div style={{ gridColumn: 'span 1 / span 1', ...itemStyle }}>{item.quantity}</div>
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
              src={
                imageResult.data.result.prefix.includes('base64')
                  ? `${imageResult.data?.result.prefix}${imageResult.data?.result.base64}`
                  : '/no_image_product.png'
              }
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
        {item.applyPrice}
      </div>
    </>
  )
}
