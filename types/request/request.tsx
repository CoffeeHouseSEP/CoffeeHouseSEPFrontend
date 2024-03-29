import { RequestCreateResponse } from '../requestDetail/requestDetail'

export interface RequestBranchResponse {
  requestId: string
  branchId: string
  createdBy: string
  createdDate: string
  status: string
  approvedBy: string
  approvedDate: string
  completedDate: string
  cancelledDate: string
  reason: string
  totalPrice: number
  branchName: string
  createdByName: string
  approvedByName: string
}
export interface RequestCancel {
  requestId: string
  cancelReason: string
}
export interface RequestCreateBranchRequest {
  listRequestDetail: RequestCreateResponse[]
}
export interface RequestUpdateBranchRequest {
  requestId: string
  listRequestDetail: RequestCreateResponse[]
}
export interface RequestBranchRequest {
  requestId: string
  branchId: string
  createdBy: string
  createdDate: string
  status: string
  approvedBy: string
  approvedDate: string
  completedDate: string
  cancelledDate: string
  reason: string
  totalPrice: number
  listRequestDetail: RequestCreateResponse[]
  branchName: string
  createdByName: string
}
export interface BranchResponseSuccess {}

export type RequestFailure = Record<keyof RequestBranchRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
