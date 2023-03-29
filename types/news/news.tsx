export interface NewsResponse {
  newsId: string
  title: string
  content: string
  createdBy: string
  createdDate: string
  status: 0 | 1
  image: {
    id: 0
    objectId: string
    base64: string
    prefix: string
  }
}

export interface NewsRequest {
  newsId: string
  title: string
  content: string
  createdBy: string
  createdDate: string
  status: 0 | 1
  image: {
    id: 0
    objectId: string
    base64: string
    prefix: string
  }
}
export interface NewsResponseSuccess {}

export type NewsRequestFailure = Record<keyof NewsRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
