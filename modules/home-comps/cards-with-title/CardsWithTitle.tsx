import { CardBase } from '@/components'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { themeValue } from '@/lib'

interface ICardsWithTitle {
  title: string
  children: ReactNode
}

export const CardsWithTitle = ({ title, children }: ICardsWithTitle) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <CardBase
      wrapperStyle={{ gap: 24 }}
      title={{
        content: title,
        style: {
          textAlign: 'center',
          fontSize: '32px',
          lineHeight: '55px',
          textTransform: 'uppercase',
          display: 'block',
          cursor: 'pointer',
          color: themeValue[darkTheme].colors.orangeHighLand,
          transition: 'linear 1s',
        },
      }}
      child={<CardBase wrapperStyle={{ flexDirection: 'row', gap: 32 }} child={children} />}
    />
  )
}
