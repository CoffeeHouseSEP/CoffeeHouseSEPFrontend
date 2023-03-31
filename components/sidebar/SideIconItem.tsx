import { useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface SidebarIconProps {
  link: string
  label: string
  isLabel: boolean
}

export const SideIconItem = (props: SidebarIconProps) => {
  const [hover, setHover] = useState(false)

  const { link, label, isLabel } = props

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const translate = useTranslationFunction()

  const router = useRouter()
  return (
    <div
      style={{
        width: isLabel ? '100%' : '60px',
        height: '60px',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLabel ? 'left' : 'center',
        gap: isLabel ? 20 : 0,
        padding: isLabel ? '0px 20px' : '',
        cursor: 'pointer',
        position: 'relative',
        borderBottom: isLabel ? `1px solid ${themeValue[darkTheme].colors.border}` : '',
        backgroundColor: hover ? themeValue[darkTheme].colors.primaryLightHover : '',
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        if (link !== router.pathname) {
          router.push(link)
        }
      }}
    >
      {isLabel && <div>{translate(label)}</div>}
    </div>
  )
}
