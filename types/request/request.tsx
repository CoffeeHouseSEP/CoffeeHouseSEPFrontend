import { RequestDetailResponse } from '../requestDetail/requestDetail'

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
  listRequestDetail: RequestDetailResponse[]
}
export interface BranchResponseSuccess {}

export type RequestFailure = Record<keyof RequestBranchRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
