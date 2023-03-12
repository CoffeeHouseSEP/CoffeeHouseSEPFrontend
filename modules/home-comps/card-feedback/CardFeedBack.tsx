import { CardBase } from '@/components'
import { FeedBackFromTravelers } from '@/components/mock-data/MockDataType'

interface CardFeedBackProps {
  data: FeedBackFromTravelers
}
export const CardFeedBack = ({ data }: CardFeedBackProps) => {
  return (
    <CardBase
      wrapperStyle={{
        border: '1px solid #e9ebee',
        borderBottom: '4px solid #75a8f9',
        padding: '24px 32px',
        justifyContent: 'start',
      }}
      title={{
        content: data.hotel,
        style: { color: '#5392f9' },
        hoveredStyle: { color: '#75a8f9' },
      }}
      subTitle={{
        content: data.location,
        style: { color: '#737373' },
      }}
      description={{
        content: data.description,
        style: { fontSize: 20, fontWeight: 700 },
      }}
      child={<div>- {data.name}</div>}
    />
  )
}
