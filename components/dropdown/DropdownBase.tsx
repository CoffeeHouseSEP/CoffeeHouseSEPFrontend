import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ReactNode, RefObject, useRef, HTMLAttributes, CSSProperties } from 'react'
import { useSelector } from 'react-redux'

interface IDropdownBase extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  open?: boolean
  refParent: RefObject<HTMLDivElement>
  zIndex?: number
  typeWidth?: 'full' | 'content'
}

export const DropdownBase = ({
  children,
  open,
  refParent,
  zIndex,
  style,
  typeWidth = 'content',
  onClick,
}: IDropdownBase) => {
  const refChild = useRef<HTMLDivElement>(null)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getPositionY = () => {
    if (typeof window !== 'undefined' && refParent?.current && refChild.current) {
      const positionParent = refParent?.current?.getBoundingClientRect()?.top ?? 0
      const windowHeight = window.innerHeight
      const heightParent = refParent?.current?.getBoundingClientRect()?.height ?? 0
      const heightChild = refChild.current.getBoundingClientRect().height
      if (positionParent + heightParent + heightChild < windowHeight) {
        return positionParent + heightParent
      }

      return positionParent - heightChild - 5
    }
    return 0
  }

  const getWidth = (): CSSProperties => {
    if (typeof window !== 'undefined' && refParent?.current && open) {
      if (typeWidth === 'content') {
        return {
          width: 'auto',
          right: undefined,
        }
      }
      return {
        right: window.innerWidth - refParent.current.getBoundingClientRect().right,
        width: undefined,
      }
    }
    return {
      width: '0px',
      right: undefined,
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: getPositionY(),
        left: refParent?.current?.getBoundingClientRect()?.left ?? 0,
        right: getWidth().right,
        width: getWidth().width,
        backgroundColor: themeValue[darkTheme].colors.gray200,
        boxShadow: themeValue[darkTheme].shadows.lg,
        zIndex: zIndex ?? 10,
        borderRadius: 10,
        overflow: 'hidden',
        ...style,
      }}
      onClick={onClick}
      ref={refChild}
    >
      {children}
    </div>
  )
}
