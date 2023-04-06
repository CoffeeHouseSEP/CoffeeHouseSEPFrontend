import { CardBase } from '@/components'
import { RecommendedDataTypeStore } from '@/components/mock-data/MockDataType'
import { useResponsive } from '@/hooks'
import { BsArrowRight } from 'react-icons/bs'

interface CardFeedBackProps {
  data: RecommendedDataTypeStore
}

export const CardLocation = ({ data }: CardFeedBackProps) => {
  const pixel = useResponsive()
  return (
    <CardBase
      wrapperStyle={{
        borderBottom: '4px solid #75a8f9',
        padding: '24px 32px',
        justifyContent: 'start',
        outline: 'none',
        color: '#fff',
        cursor: 'pointer',
      }}
      description={{
        content: data.name,
        style: { fontSize: pixel <= 1280 ? 12 : 20, fontWeight: 700 },
      }}
      child={
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 12 }}>
          {' '}
          {data.address} <BsArrowRight />
        </div>
      }
      title={{
        content: data.title,
        style: { color: '#fff', fontSize: pixel <= 1280 ? '1.4rem' : '2rem' },
        hoveredStyle: { color: '#75a8f9' },
      }}
    />
  )
}
