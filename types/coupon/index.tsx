export interface CouponResponse {
  couponId: string
  code: string
  type: number
  value: number
  status: number
  createdDate: string
  expiredDate: string
  appliedDate: string
  maxValuePromotion: number
}

export interface CouponRequest {
  code: string
  value: number
  status: 0 | 1
  createdDate: Date
  expiredDate: Date
  appliedDate: Date
  maxValuePromotion: number
}

export type CouponRequestFailure = Record<keyof CouponRequest, string>
