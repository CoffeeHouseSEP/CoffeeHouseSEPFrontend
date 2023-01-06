import { useTranslation } from '@/hooks'

export const GenderList = () => {
  const male = useTranslation('male')

  const female = useTranslation('female')

  return [
    {
      value: 0,
      label: male,
    },
    {
      value: 1,
      label: female,
    },
  ]
}
