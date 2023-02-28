import { useTranslation } from '@/hooks'

export const PathTypeList = () => {
  const internal = useTranslation('internal')

  const external = useTranslation('external')

  return [
    {
      value: 'INTERNAL',
      label: internal,
    },
    {
      value: 'EXTERNAL',
      label: external,
    },
  ]
}
