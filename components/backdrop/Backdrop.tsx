import { HTMLAttributes } from 'react'

interface IBackdrop extends HTMLAttributes<HTMLDivElement> {
  zIndex?: number
  isShow?: boolean
}

export const Backdrop = ({ style, zIndex, isShow, ...props }: IBackdrop) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: isShow ? '100vh' : 0,
        zIndex: zIndex ?? 10,
        transition: 'all 0.2s linear',
        backgroundColor: 'rgba(0,0,0,0.5)',
        ...style,
      }}
      {...props}
    />
  )
}
