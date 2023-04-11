import { Input } from '@/components'
import { cityData, cityStore } from '@/components/mock-data/MockDataConstant'
import { RecommendedDataType, RecommendedDataTypeStore } from '@/components/mock-data/MockDataType'
import { CustomSlider } from '@/components/slider/Slider'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CommonListResultType, NewItem } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BsChevronRight, BsFillCalendar2DateFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { CardDestinations } from '../home-comps/card-destinations/CardDestinations'
import { CardLocation } from '../home-comps/card-location/CardLocation'
import ImageItem from '../news/Image/ImageItem'

export const HomeContainer = () => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const router = useRouter()
  const pixel = useResponsive()
  const newsList = useApiCall<CommonListResultType<NewItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.news.getListNews,
        params: { page: '1', pageSize: '3', keySort: 'asc', sortField: 'createdDate', status: 1 },
      }),
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    newsList.setLetCall(true)
  }, [])
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
              style={{
                width: pixel <= 1280 ? `${pixel}px` : '100%',
                height: pixel <= 1280 ? `${pixel}px` : '485px',
                position: 'relative',
                aspectRatio: '1/1',
              }}
            >
              <Image layout="fill" src="/asset/poster.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{
                width: pixel <= 1280 ? `${pixel}px` : '100%',
                height: pixel <= 1280 ? `${pixel}px` : '485px',
                position: 'relative',
                aspectRatio: '1/1',
              }}
            >
              <Image layout="fill" src="/asset/poster2.png" />
            </div>
          </a>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: pixel <= 1280 ? '1fr ' : '1fr 1fr',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: pixel <= 1280 ? `${pixel}px` : '100%',
            height: pixel <= 1280 ? `${pixel}px` : '485px',
            position: 'relative',
            aspectRatio: '1/1',
          }}
        >
          <Image layout="fill" objectFit="cover" src="/asset/store.jpg" />
        </div>
        <div
          style={{
            width: pixel <= 1000 ? `${pixel}px` : '100%',
            height: pixel <= 380 ? '380px' : '485px',
            position: 'relative',
            top: 0,
            bottom: 0,
            aspectRatio: '1/1',
          }}
        >
          <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
          <div
            style={{
              position: 'absolute',
              top: pixel <= 500 ? 0 : 40,
              left: pixel <= 500 ? 20 : 100,
            }}
          >
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
            {newsList.data?.result &&
              newsList.data?.result.data.map((item) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '2px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(`/news/${item.newsId}`)}
                >
                  <div
                    style={{
                      width: pixel <= 380 ? '80px' : '120px',
                      height: pixel <= 380 ? '60px' : '80px',
                      position: 'relative',
                      aspectRatio: '1',
                      cursor: 'pointer',
                      transition: 'linear 1s',
                    }}
                  >
                    <ImageItem id={item.newsId} />
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
                        fontSize: pixel <= 380 ? '10px' : '16px',
                        lineHeight: pixel <= 380 ? '16px' : '24px',
                        fontWeight: 'bold',
                        maxHeight: '48px',
                        width: pixel <= 380 ? '60%' : '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </h5>
                    <span
                      style={{
                        color: '#666666',
                        fontSize: pixel <= 380 ? '10px' : '12px',
                        lineHeight: '21px',
                      }}
                    >
                      <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                      {item?.createdDate.replaceAll(':00.000+00:00', '')}
                    </span>
                  </div>
                </div>
              ))}
            <div style={{ display: 'flex', gap: 0 }}>
              <Input
                style={{
                  width: pixel <= 380 ? 200 : 400,
                  height: '100%',
                  backgroundColor: themeValue[darkTheme].colors.background,
                }}
                placeholder="Enter your email to receive information..."
                type="email"
              />
              <div
                style={{
                  backgroundColor: '#53382c',
                  display: 'flex',
                  padding: 12,
                  justifyContent: 'center',
                  color: '#fff',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <AiOutlineSend style={{ marginRight: 10 }} /> <span>Gửi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
