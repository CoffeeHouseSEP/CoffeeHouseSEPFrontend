import { RecommendedDataType } from '@/components/mock-data/MockDataType'
import { CardBase } from '@/components'
import { useResponsive } from '@/hooks'

interface CardDestinationsProps {
  data: RecommendedDataType
}
export const CardDestinations = ({ data }: CardDestinationsProps) => {
  const pixel = useResponsive()
  if (!data) return null
  return (
    <CardBase
      image={{
        content: data.imageUrl,
        style: {
          width: '100%',
          height: pixel <= 1280 ? `${pixel}px` : '485px',
          position: 'relative',
          aspectRatio: '1/1',
        },
        hoveredStyle: {},
      }}
    />
  )
}
