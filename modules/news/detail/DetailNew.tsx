import Page404 from '@/components/404/Page404'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType, NewItem } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { CiAlarmOn } from 'react-icons/ci'
import ImageItem from '../Image/ImageItem'

export default function DetailNew() {
  const router = useRouter()
  const id = router?.query?.id?.toString()

  const [isHover, setIsHover] = useState<string>()
  const handleMouseEnter = (id: string | undefined) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }
  const newsList = useApiCall<CommonListResultType<NewItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.news.getListNews,
        params: { page: '1', pageSize: '10', keySort: 'desc', sortField: 'createdDate' },
      }),
  })
  const news = useApiCall<CommonListResultType<NewItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.news.getListNews,
        params: { page: '1', pageSize: '1', newsId: id || '' },
      }),
  })

  useEffect(() => {
    if (!!id) {
      news.setLetCall(true)
      newsList.setLetCall(true)
    }
  }, [id])
  const newDetail = news.data?.result.data[0]
  if (!newDetail) {
    return <Page404 />
  }

  return (
    <div style={{ padding: '20px 150px' }}>
      <h1
        style={{
          fontSize: '24px',
          lineHeight: '32px',
          color: '#83382c',
          textTransform: 'uppercase',
          display: 'block',
          fontWeight: 'bold',
        }}
      >
        {newDetail?.title}
      </h1>
      <div
        style={{
          textAlign: 'left',
          fontSize: '13px',
          lineHeight: '21px',
          color: '#888888',
          paddingTop: '15px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <CiAlarmOn size="25" />
          <span style={{ marginLeft: '10px' }}>
            {newDetail?.createdDate.replaceAll(':00.000+00:00', '')}
          </span>
        </span>
      </div>
      <p>{newDetail?.content}</p>

      <div
        style={{
          width: '800px',
          height: '351px',
          position: 'relative',
          aspectRatio: '1/1',
          cursor: 'pointer',
          transition: 'linear 1s',
          margin: '0 auto',
        }}
      >
        <ImageItem id={newDetail.newsId} />
      </div>

      <h2
        style={{
          fontSize: '32px',
          lineHeight: '40px',
          fontWeight: 'bold',
          color: isHover === newDetail?.newsId ? '#882106' : '#53382c',
          cursor: 'pointer',
        }}
        onMouseEnter={() => handleMouseEnter(newDetail?.newsId)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {' '}
        CÁC TIN KHÁC
      </h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {newsList.data?.result.data.map((item) => (
          <li
            style={{
              listStyle: 'none',
              padding: '5px',
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/news/${item.newsId}`)}
          >
            <BsFillCaretRightFill style={{ color: '#333', padding: '2px 2px' }} /> {item.title}{' '}
            <span
              style={{
                fontWeight: 'lighter',
                color: '#999999',
                lineHeight: '22px',
                fontSize: '14px',
              }}
            >
              ( {item.createdDate.replaceAll(':00.000+00:00', '')})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
