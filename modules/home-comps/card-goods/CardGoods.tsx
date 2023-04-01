import { CardBase } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { GoodsRequest } from '@/types/goods/goods'
import { ImageResponse } from '@/types/image'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface CardGoodsProps {
  data: GoodsRequest
}
export const CardGoods = ({ data }: CardGoodsProps) => {
  const pixel = useResponsive()
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const imageResult = useApiCall<ImageResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.image.imageInfo,
        token: cookies.token,
        params: {
          objectId: data.goodsId ?? '1',
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })
  useEffect(() => {
    if (!!data.goodsId) {
      imageResult.setLetCall(true)
    }
  }, [data.goodsId])
  if (!data) return null
  return (
    <>
      {!!imageResult.data?.result.base64 && (
        <CardBase
          image={{
            content: `${imageResult.data.result.prefix}${imageResult.data.result.base64}`,
            style: {
              aspectRatio: '1/1',
              cursor: 'pointer',
              width: pixel <= 500 ? '40%' : '60%',
              height: '100%',
              background: '#fff',
              position: 'relative',
              border: 'solid 1px #eeeeee',
              transition: 'linear 1s',
              margin: '0 auto',
            },
            hoveredStyle: { scale: '110%' },
          }}
          title={{
            content: data.name,
            style: {
              fontSize: pixel <= 500 ? 12 : 20,
              fontWeight: 700,
              color: '#53382c',
              margin: '0 auto',
            },
          }}
          description={{
            content: data.applyPrice.toString(),
            style: {
              fontSize: pixel <= 500 ? 12 : 18,
              fontWeight: 700,
              color: '#53382c',
              margin: '0 auto',
            },
          }}
        />
      )}
    </>
  )
}
