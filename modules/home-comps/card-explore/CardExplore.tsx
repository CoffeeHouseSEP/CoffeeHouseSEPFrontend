import { CardBase } from '@/components'
import { RecommendedDataType } from '@/components/mock-data/MockDataType'

interface CardDestinationsProps {
  data: RecommendedDataType
}
export const CardExplore = ({ data }: CardDestinationsProps) => {
  return (
    <CardBase
      hoveredStyle={{ boxShadow: '0 1px 6px 2px rgb(0 0 0 / 20%)' }}
      wrapperStyle={{ border: '1px solid #dddfe2', alignItems: 'start' }}
      image={{ content: data.imageUrl }}
      title={{ content: data.name, style: { padding: '8px 8px 0' } }}
      subTitle={{
        content: data.properties.concat(' chỗ nghỉ'),
        style: { padding: '4px 8px 8px' },
      }}
    />
  )
}
