import { CSSProperties, ReactNode } from 'react'

export type StringCardType = {
  style?: CSSProperties
  content: string
  child?: ReactNode
  Link?: string
  hoveredStyle?: CSSProperties
}

export const initWrapperStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s linear',
}

export const initImageStyle: CSSProperties = {
  width: '100%',
  aspectRatio: '1',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.2s linear',
}

export const initTitleStyle: CSSProperties = {
  fontWeight: 500,
  fontSize: '16px',
  padding: 4,
  transition: 'all 0.2s linear',
}

export const initSubTitleStyle: CSSProperties = {
  fontWeight: 400,
  fontSize: '14px',
  padding: 2,
  transition: 'all 0.2s linear',
}

export const initDesCriptionStyle: CSSProperties = {
  fontWeight: 400,
  fontSize: '14px',
  transition: 'all 0.2s linear',
}
