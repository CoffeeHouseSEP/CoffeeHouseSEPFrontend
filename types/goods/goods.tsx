import { ImageResponse } from '../image'

export interface GoodsRequest {
  goodsId: string
  name: string
  code: string
  applyPrice: number
  innerPrice: number
  description: string
  status: 0 | 1
  categoryId: string
  isSize: number
  isTransfer: number
  isSold: number
  goodsUnit: number
  image: ImageResponse
}
export interface GoodsResponse {
  goodsId: string
  name: string
  code: string
  applyPrice: number
  isTransfer: number
  innerPrice: number
  description: string
  status: 0 | 1
  categoryId: string
  isSize: number
  isSold: number
  goodsUnit: number
}
export interface GoodsResponseSuccess {}

export type GoodsRequestFailure = Record<keyof GoodsRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
