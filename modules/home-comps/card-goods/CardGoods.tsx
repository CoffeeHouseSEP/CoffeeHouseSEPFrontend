import { CardBase } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useResponsive } from '@/hooks'
import { getMethod } from '@/services'
import { GoodsResponse } from '@/types/goods/goods'
import { ImageResponse } from '@/types/image'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

interface CardGoodsProps {
  data: GoodsResponse
}
export const CardGoods = ({ data }: CardGoodsProps) => {
  const pixel = useResponsive()
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
    preventLoadingGlobal: true,
  })
  useEffect(() => {
    if (!!data.goodsId) {
      imageResult.setLetCall(true)
    }
  }, [data.goodsId])
  if (!data) return null
  return (
    <CardBase
      Link={data.goodsId}
      image={{
        content:
          !!imageResult.data?.result.base64 && imageResult.data?.result.prefix.includes('base64')
            ? `${imageResult.data.result.prefix}${imageResult.data.result.base64}`
            : '',
        style: {
          aspectRatio: '1/1',
          cursor: 'pointer',
          width: pixel <= 500 ? '40%' : '50%',
          height: '100%',
          background: '#fff',
          position: 'relative',
          border: 'solid 1px #eeeeee',
          borderRadius: 10,
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
  )
}
