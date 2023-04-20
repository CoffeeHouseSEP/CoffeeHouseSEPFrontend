import { ShareStoreSelector } from '@/redux/share-store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useTranslation = (key: string) => {
  const { language } = useSelector(ShareStoreSelector)

  const result = useMemo(() => {
    if (language[key]) return language[key]
    return `${key}!`
  }, [key, language])

  return result
}

export const useTranslationFunction = () => {
  const { language } = useSelector(ShareStoreSelector)

  const getTranslate = (key: string) => {
    if (key.trim() === '') return ''
    if (language[key]) return language[key]
    return `${key}!`
  }

  return getTranslate
}
