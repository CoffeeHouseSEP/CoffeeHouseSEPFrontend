import { OrderDetailResponse } from '../orderDetail/orderDetail'

export interface OrderResponse {
  ordersId: string
  customerId: string
  customerName: string
  branchId: string
  createdDate: string
  totalPrice: number
  shippedDate: string
  address: string
  province: string
  ward: string
  district: string
  couponId: number
  status: string
  approvedDate: string
  cancelledDate: string
  reason: string
}
export interface OrderCancel {
  requestId: string
  cancelReason: string
}

export interface OrderRequest {
  ordersId: string
  customerId: string
  customerName: string
  branchId: string
  createdDate: string
  totalPrice: number
  shippedDate: string
  address: string
  province: string
  ward: string
  district: string
  couponId: number
  status: string
  approvedDate: string
  cancelledDate: string
  reason: string
  listOrderDetail: OrderDetailResponse[]
}
export interface BranchResponseSuccess {}

export type OrderFailure = Record<keyof OrderRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }