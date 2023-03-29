import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { ImageResponse } from '@/types/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface IitemImage {
  id: string
  width?: number
  height?: number
}
export default function ImageItem({ id, width, height }: IitemImage) {
  const [isHover, setIsHover] = useState<string>()
  const handleMouseEnter = (id: string | undefined) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }

  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const imageResult = useApiCall<ImageResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.image.imageInfo,
        token: cookies.token,
        params: {
          objectId: id ?? '1',
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  useEffect(() => {
    if (!!id) {
      imageResult.setLetCall(true)
    }
  }, [id])

  return (
    <div>
      {!!imageResult.data?.result.base64 ? (
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            aspectRatio: '1',
            position: 'relative',
            objectFit: 'cover',
          }}
        >
          <Image
            layout="fill"
            style={{ scale: isHover === id ? '1.1' : '1', transform: 'linear' }}
            alt="Tet1"
            src={`${imageResult.data.result.prefix}${imageResult.data.result.base64}`}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={() => handleMouseLeave()}
          />
        </div>
      ) : (
        <div>Not Found Image</div>
      )}
    </div>
  )
}
