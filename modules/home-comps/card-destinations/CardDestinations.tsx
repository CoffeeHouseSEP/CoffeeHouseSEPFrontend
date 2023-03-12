import { RecommendedDataType } from '@/components/mock-data/MockDataType'
import { CardBase } from '@/components'

interface CardDestinationsProps {
  data: RecommendedDataType
}
export const CardDestinations = ({ data }: CardDestinationsProps) => {
  if (!data) return null
  return (
    <CardBase
      image={{
        content: data.imageUrl,
        style: { width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' },
        hoveredStyle: {},
      }}
    />
  )
}
