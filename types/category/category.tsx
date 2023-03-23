export interface CategoryResponse {
  categoryId: string
  name: string
  description: string
  status: 0 | 1
}

export interface CategoryRequest {
  categoryId?: string
  name?: string
  description?: string
  status?: 0 | 1
}
export interface CategoryResponseSuccess {}

export type CategoryRequestFailure = Record<keyof CategoryRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
