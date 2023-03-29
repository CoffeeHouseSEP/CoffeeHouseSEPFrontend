import { cityData, cityStore } from '@/components/mock-data/MockDataConstant'
import { RecommendedDataType, RecommendedDataTypeStore } from '@/components/mock-data/MockDataType'
import { CustomSlider } from '@/components/slider/Slider'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType, NewItem } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsChevronRight, BsFillCalendar2DateFill } from 'react-icons/bs'
import { CardDestinations } from '../home-comps/card-destinations/CardDestinations'
import { CardLocation } from '../home-comps/card-location/CardLocation'

export const HomeContainer = () => {
  const router = useRouter()
  // const translate = useTranslationFunction()
  const [isHover, setIsHover] = useState<string>()
  // const [objectId, setObjectId] = useState<string>()
  // const [imageInfo, setImageInfo] = useState<string>()
  const handleMouseEnter = (id: string | undefined) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }
  // const getImage = useApiCall<CommonListResultType<ImageItem>, String>({
  //   callApi: () =>
  //     getMethod({
  //       pathName: apiRoute.imageInfo.getImage,
  //       params: { objectId: `${objectId}` },
  //     }),
  //   handleError(status, message) {
  //     if (status) {
  //       toast.error(translate(message))
  //     }
  //   },
  //   handleSuccess(message, data) {},
  // })
  // const getImageByObjectId = (id: string) => {
  //   setObjectId(id)
  //   return imageInfo
  // }
  const newsList = useApiCall<CommonListResultType<NewItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.new.getListNews,
        params: { page: '1', pageSize: '3', keySort: 'asc', sortField: 'createdDate', status: 1 },
      }),
  })
  // useEffect(() => {
  //   newsList.setLetCall(true)
  //   getImage.setLetCall(true)
  // }, [objectId])
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          background: 'linear-gradient(to right, #232526, #414345)',
        }}
      >
        <CustomSlider
          ItemCard={cityData.map((item: RecommendedDataType) => (
            <CardDestinations key={item.id} data={item} />
          ))}
          numberDisplay={1}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: ' 0 auto',
          gap: 40,
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #232526, #414345)',
        }}
      >
        <CustomSlider
          ItemCard={cityStore.map((item: RecommendedDataTypeStore) => (
            <CardLocation key={item.id} data={item} />
          ))}
          numberDisplay={1}
        />
      </div>

      <div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/poster.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/poster2.png" />
            </div>
          </a>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', height: '459px', position: 'relative', aspectRatio: '1/1' }}>
          <Image layout="fill" objectFit="cover" src="/asset/store.jpg" />
        </div>
        {/* <div
          style={{
            position: 'absolute',
            fontSize: '2rem',
            fontWeight: '1000',
            top: '10%',
            left: '20%',
            color: '#fff',
          }}
        >
          {' '}
          QUÁN MỚI{' '}
        </div> */}
        <div
          style={{
            width: '100%',
            height: '459px',
            position: 'relative',
            top: 0,
            bottom: 0,
            aspectRatio: '1/1',
          }}
        >
          <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
          <div style={{ position: 'absolute', top: 40, left: 100 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}
            >
              <h2
                style={{
                  display: 'block',
                  fontSize: '26px',
                  lineHeight: '34px',
                  whiteSpace: 'nowrap',
                }}
              >
                TIN MỚI NHẤT
              </h2>
              <div>
                <a
                  style={{
                    textDecoration: 'underline',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold',
                  }}
                  href="news/listnews"
                >
                  <span>Xem toàn bộ</span> <BsChevronRight />
                </a>
              </div>
            </div>
            {newsList.data?.result.data.map((item) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '2px 0',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => handleMouseEnter(item.newsId)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => router.push(`/news/${item.newsId}`)}
              >
                <div>
                  <Image
                    style={{
                      scale: isHover === item.newsId ? '1.1' : '1',
                      transform: 'linear 1s',
                    }}
                    src="/asset/tet1.jpg"
                    width={120}
                    height={80}
                    alt="Tet1"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginLeft: 30,
                  }}
                >
                  <h5
                    style={{
                      textTransform: 'uppercase',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 'bold',
                      maxHeight: '48px',
                      overflow: 'hidden',
                    }}
                  >
                    {item.title}
                  </h5>
                  <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                    <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                    {item?.createdDate.replaceAll(':00.000+00:00', '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
