import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { ImageResponse } from '@/types/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

interface IitemImage {
  id?: string
  altname?: string
}
export default function ImageItem({ id, altname }: IitemImage) {
  const [isHover, setIsHover] = useState<string>()
  const handleMouseEnter = (id: string | undefined) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }

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
    preventLoadingGlobal: true,
  })
  useEffect(() => {
    if (!!id) {
      imageResult.setLetCall(true)
    }
  }, [id])

  return (
    <>
      {!!imageResult.data?.result.base64 && (
        <Image
          style={{
            scale: isHover === id ? '1.1' : '1',
          }}
          alt={altname}
          src={`${imageResult.data.result.prefix}${imageResult.data.result.base64}`}
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave()}
          layout="fill"
          objectFit="cover"
        />
      )}
    </>
  )
}
