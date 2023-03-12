import { CardBase } from '@/components'
import { RecommendedDataTypeStore } from '@/components/mock-data/MockDataType'
import { BsArrowRight } from 'react-icons/bs'

interface CardFeedBackProps {
  data: RecommendedDataTypeStore
}

export const CardLocation = ({ data }: CardFeedBackProps) => {
  return (
    <CardBase
      wrapperStyle={{
        borderBottom: '4px solid #75a8f9',
        padding: '24px 32px',
        justifyContent: 'start',
        outline: 'none',
        color: '#fff',
      }}
      description={{
        content: data.name,
        style: { fontSize: 20, fontWeight: 700 },
      }}
      child={
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {' '}
          {data.address} <BsArrowRight />
        </div>
      }
      title={{
        content: data.title,
        style: { color: '#fff', fontSize: '2rem' },
        hoveredStyle: { color: '#75a8f9' },
      }}
    />
  )
}
