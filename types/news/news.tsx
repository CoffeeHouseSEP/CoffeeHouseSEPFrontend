import { ImageResponse } from '../image'

export interface NewsResponse {
  newsId: string
  title: string
  content: string
  createdBy: string
  createdDate: string
  status: 0 | 1
}

export interface NewsRequest {
  newsId: string
  title: string
  content: string
  createdBy: string
  createdDate: string
  status: 0 | 1
  image: ImageResponse
}
export interface NewsResponseSuccess {}

export type NewsRequestFailure = Record<keyof NewsRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
