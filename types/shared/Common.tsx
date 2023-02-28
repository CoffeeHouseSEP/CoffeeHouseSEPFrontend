import { ReactNode } from 'react'

export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
export interface CommonResponseType<T> {
  success: boolean
  result: T
  message: string
  statusCode: number
  viewPoints: ViewPointType[]
  editable: ViewPointType[]
}

export interface CommonListResultType<T> {
  data: T[]
  page: number
  pageSize: number
  totalRows: number
}

export type QueryParams = {
  id?: string
  page?: string
  pageSize?: string
  allParams?: { [key: string]: string }
  keySort?: string
  sortField?: string
} & { [key: string]: string | number }

export type PseudoType = 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'none'
export type ColorType = 'primary' | 'success' | 'secondary' | 'warning' | 'error' | 'gradient'
export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SpeedDialType = {
  label: ReactNode
  function?: Function
  router?: string
  color?: ColorType
}
