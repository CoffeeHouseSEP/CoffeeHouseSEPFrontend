import { CardBase } from '@/components'
import { HighlightData } from '@/components/mock-data/MockDataType'
import { MdLocationPin } from 'react-icons/md'

interface CardProductProps {
  data: HighlightData
}
export const CardProduct = ({ data }: CardProductProps) => {
  return (
    <CardBase
      wrapperStyle={{ alignItems: 'start', gap: 2 }}
      image={{
        content: data.imageUrl,
        child: (
          <div
            style={{
              position: 'absolute',
              top: 4,
              right: 16,
              width: '3rem',
              height: '3rem',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ transform: 'scaleX(-1)' }}
              fill="#0283df"
            >
              <path d="M1.499 2.553h20.32a2 2 0 0 1 2 2v14.983a2 2 0 0 1-2 2H4.829a2 2 0 0 1-2-2V8.333L.298 4.951a1.5 1.5 0 0 1 1.2-2.398z" />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: -3,
                width: '3rem',
                height: '3rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              9.0
            </div>
          </div>
        ),
      }}
      title={{
        content: data.name,
        style: { padding: 2, fontSize: '14px' },
      }}
      child={
        <>
          <div style={{ color: '#5392f9', fontSize: 12, padding: 2 }}>
            <MdLocationPin size={12} />
            <span>{data.address}</span>
          </div>
          <div style={{ color: 'rgb(115,115,115)', padding: 2, fontSize: 12 }}>
            Giá mỗi đêm rẻ nhất từ
          </div>
          <div style={{ color: '#E12D2D', padding: 2 }}>{data.price}</div>
        </>
      }
    />
  )
}
