export interface GoodResponse {
  innerPrice: number
  code: string
  goodsId: string
  name: string
  description: string
  applyPrice: number
  categoryId: string
  status: 0 | 1
}

export interface GoodRequest {
  goodsId: string
  name: string
  code: string
  applyPrice: number
  innerPrice: number
  description: string
  status: 0 | 1
  categoryId: string
  image: {
    id: string
    objectId: string
    base64: string
    prefix: string
  }
}
export interface CategoryResponseSuccess {}

export type GoodRequestFailure = Record<keyof GoodRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
