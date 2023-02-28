import { addClassBody, removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CSSProperties, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface IModal {
  children: ReactNode
  open: boolean
  setOpen?: (v: boolean) => void
  preventClose?: boolean
  zIndex?: number
  ModalStyle?: CSSProperties
  width?: number
  notBlur?: boolean
  justifyContent?: 'start' | 'end' | 'center'
  alignItems?: 'start' | 'end' | 'center'
}

export const Modal = ({
  children,
  open,
  setOpen,
  preventClose,
  zIndex,
  ModalStyle,
  width,
  notBlur,
  justifyContent = 'center',
  alignItems = 'center',
}: IModal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClose = () => {
    if (!preventClose && setOpen) setOpen(false)
  }

  useEffect(() => {
    if (open) addClassBody('overflow')
    else removeClassBody('overflow')
  }, [open])

  return (
    <div
      onClick={handleClose}
      style={{
        zIndex: zIndex ?? 10,
        position: 'fixed',
        top: 0,
        left: 0,
        right: open ? 0 : undefined,
        bottom: open ? 0 : undefined,
        width: !open ? 0 : undefined,
        overflow: 'auto',
        display: 'flex',
        justifyContent,
        alignItems,
      }}
    >
      <div
        style={{
          zIndex: (zIndex ?? 10) - 1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: open ? 0 : undefined,
          bottom: open ? 0 : undefined,
          width: !open ? 0 : undefined,
          overflow: 'auto',
          backgroundColor: 'rgba(0,0,0,0.2)',
          backdropFilter: !notBlur ? 'blur(15px)' : undefined,
          WebkitBackdropFilter: !notBlur ? 'blur(15px)' : undefined,
        }}
      />
      <div
        style={{
          zIndex: zIndex ?? 10,
          width: '90%',
          maxWidth: width ?? 400,
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          boxShadow: themeValue[darkTheme].shadows.lg,
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          ...ModalStyle,
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        {children}
      </div>
    </div>
  )
}
