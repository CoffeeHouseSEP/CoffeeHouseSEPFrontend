import { useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const SignOutButton = () => {
  const [hover, setHover] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const translate = useTranslationFunction()

  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '0px 20px',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
        backgroundColor: hover ? themeValue[darkTheme].colors.blue200 : '',
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {}}
    >
      {translate('signOut')}
    </div>
  )
}
