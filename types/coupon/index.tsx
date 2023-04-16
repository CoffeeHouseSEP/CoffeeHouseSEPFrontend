export interface CouponResponse {
  couponId: string
  code: string
  type: number
  value: number
  status: number
  createdDate: Date
  expiredDate: Date
  appliedDate: Date
  maxValuePromotion: number
}
