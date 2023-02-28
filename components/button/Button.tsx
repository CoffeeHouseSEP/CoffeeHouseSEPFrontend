import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ColorType, SizeType } from '@/types'
import { ButtonHTMLAttributes, CSSProperties, useState } from 'react'
import { useSelector } from 'react-redux'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType
  styleType?: 'flat' | 'light' | 'ghost' | 'default'
  auto?: boolean
  size?: SizeType
}

export const Button = ({
  color,
  auto,
  styleType,
  disabled,
  onClick,
  size = 'md',
  children,
  style,
  ...rest
}: IButton) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [hover, setHover] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }

  const getColor = (): CSSProperties => {
    const disableColor = themeValue[darkTheme].colors.gray400

    const colorChoose = themeValue[darkTheme].colors[color ?? 'primary']

    const colorLight = (color ?? 'primary').concat('Light') as keyof typeof themeValue.light.colors

    const colorLightHover = (color ?? 'primary').concat(
      'LightHover'
    ) as keyof typeof themeValue.light.colors

    switch (styleType) {
      case 'light':
        if (disabled) return { color: disableColor }
        return {
          backgroundColor: 'transparent',
          color: color ? themeValue[darkTheme].colors[color] : themeValue[darkTheme].colors.gray900,
        }
      case 'flat':
        if (disabled)
          return { backgroundColor: disableColor, color: themeValue[darkTheme].colors.gray700 }
        return {
          backgroundColor: hover
            ? themeValue[darkTheme].colors[colorLightHover]
            : themeValue[darkTheme].colors[colorLight],
          color: colorChoose,
        }
      case 'ghost':
        if (disabled)
          return {
            backgroundColor: disableColor,
            border: `1px solid ${colorChoose}`,
            color: themeValue[darkTheme].colors.gray700,
          }
        return {
          backgroundColor: hover ? colorChoose : 'transparent',
          color: hover ? 'white' : colorChoose,
          border: `1px solid ${colorChoose}`,
        }
      default:
        if (disabled)
          return { backgroundColor: disableColor, color: themeValue[darkTheme].colors.gray700 }
        return {
          backgroundColor: colorChoose,
          color: 'white',
        }
    }
  }

  const getSize = (): CSSProperties => {
    switch (size) {
      case 'md':
        return { height: '2.5rem', padding: '0 0.875rem', fontSize: '0.875rem' }
      case 'sm':
        return { height: '2rem', padding: '0 0.625rem', fontSize: '0.875rem' }
      case 'xs':
        return { height: '1.5rem', padding: '0 0.375rem', fontSize: '0.75rem' }
      case 'lg':
        return { height: '3rem', padding: '0 1.25rem', fontSize: '1rem' }
      default:
        return { height: '4rem', padding: '0 1.5rem', fontSize: '1.125rem' }
    }
  }

  return (
    <button
      style={{
        width: auto ? '100%' : 'max-content',
        padding: '0 20px',
        cursor: disabled ? 'default' : 'pointer',
        fontWeight: 600,
        borderRadius: '12px',
        ...getSize(),
        ...getColor(),
        ...style,
      }}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
