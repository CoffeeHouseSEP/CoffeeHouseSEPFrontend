import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ColorType, SizeType } from '@/types'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'

interface ICheckbox {
  color?: ColorType
  labelColor?: ColorType
  disabled?: boolean
  isSelected?: boolean
  isReadOnly?: boolean
  sizes?: SizeType
  onChange?: Function
  children?: ReactNode
}

export const Checkbox = ({
  color = 'primary',
  labelColor,
  disabled,
  isSelected,
  isReadOnly,
  children,
  sizes = 'md',
  onChange,
}: ICheckbox) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getSize = (): CSSProperties => {
    switch (sizes) {
      case 'md':
        return { width: '1.25rem' }
      case 'sm':
        return { width: '1rem' }
      case 'xs':
        return { width: '0.875rem' }
      case 'lg':
        return { width: '1.5rem' }
      default:
        return { width: '1.75rem' }
    }
  }

  const getSizeV = (): CSSProperties => {
    switch (sizes) {
      case 'md':
        return { transform: 'rotate(45deg) scale(0.8)' }
      case 'sm':
        return { transform: 'rotate(45deg) scale(0.5)' }
      case 'xs':
        return { transform: 'rotate(45deg) scale(0.5)' }
      case 'lg':
        return { transform: 'rotate(45deg)' }
      default:
        return { transform: 'rotate(45deg)' }
    }
  }

  const handleChange = () => {
    if (onChange && !isReadOnly && !disabled) {
      onChange()
    }
  }

  return (
    <div
      style={{
        color: disabled
          ? themeValue[darkTheme].colors.gray500
          : themeValue[darkTheme].colors[labelColor ?? 'foreground'],
        opacity: disabled ? '50%' : '100%',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        cursor: disabled || isReadOnly ? 'default' : 'pointer',
      }}
      onClick={handleChange}
    >
      <div
        style={{
          aspectRatio: '1',
          borderRadius: '33%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${themeValue[darkTheme].colors.border}`,
          ...getSize(),
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.1s linear',
            width: '100%',
            height: '100%',
            opacity: isSelected ? '100%' : 0,
            backgroundColor: themeValue[darkTheme].colors[color],
          }}
        >
          <div
            style={{
              width: '0.5rem',
              height: '0.875rem',
              position: 'relative',
              transition: 'all 1s linear',
              ...getSizeV(),
            }}
          >
            <div
              style={{
                width: isSelected ? '0.5rem' : 0,
                height: '0.063rem',
                borderRadius: '0.313rem',
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: 'white',
                transition: 'width 0.2s linear',
                transitionDelay: '0.1s',
              }}
            />
            <div
              style={{
                width: '0.063rem',
                height: isSelected ? '0.875rem' : 0,
                borderRadius: '0.313rem',
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                transition: 'height 0.2s linear',
                transitionDelay: '0.3s',
              }}
            />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
