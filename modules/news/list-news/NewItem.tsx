import { NewItem } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CiAlarmOn } from 'react-icons/ci'
import ImageItem from '../Image/ImageItem'

interface IPropNews {
  list: NewItem[]
}
export default function NewsItem({ list }: IPropNews) {
  const [isHover, setIsHover] = useState<string>()
  const handleMouseEnter = (id: string) => {
    setIsHover(id)
  }
  const router = useRouter()

  const handleMouseLeave = () => {
    setIsHover('-1')
  }
  return (
    <>
      {list.map((item) => (
        <div
          style={{
            textAlign: 'center',
            height: '100%',
            borderRadius: '5%',
            boxShadow: '2px 2px 2px 2px #888888',
            overflow: 'hidden',
          }}
          onClick={() => router.push(`/news/${item.newsId}`)}
          key={item.newsId}
        >
          <div
            style={{
              width: '100%',
              height: '70%',
              position: 'relative',
              aspectRatio: '1/1',
              cursor: 'pointer',
              transition: 'linear 1s',
            }}
          >
            <ImageItem id={item.newsId} />
          </div>
          <p
            style={{
              marginTop: '15px',
              display: 'block',
              fontSize: '14px',
              lineHeight: '22px',
              overflow: 'hidden',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'linear 1s',
              color: isHover === item.newsId ? '#882106' : '#000',
              textAlign: 'left',
              paddingLeft: '10px',
            }}
            onMouseEnter={() => handleMouseEnter(item.newsId)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => router.push(`/news/${item.newsId}`)}
          >
            {item.title}
          </p>
          <div
            style={{
              textAlign: 'left',
              padding: '10px',
              fontSize: '13px',
              lineHeight: '21px',
              color: '#888888',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <CiAlarmOn size="25" style={{ marginLeft: '5px' }} />
              <span style={{ marginLeft: '10px' }}>
                {item.createdDate.replaceAll(':00.000+00:00', '')}
              </span>
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
