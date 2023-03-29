import { ImageResponse } from '../image'

export interface BranchResponse {
  branchId: string
  name: string
  address: string
  phoneNumber: string
  description: string
  branchManagerId: string
  longitude: string
  latitude: string
  status: 0 | 1
  createdDate: string
  cancelledDate: string
}

export interface BranchRequest {
  branchId: string
  name: string
  address: string
  phoneNumber: string
  description: string
  branchManagerId: string
  longitude: string
  latitude: string
  status: 0 | 1
  createdDate: string
  cancelledDate: string
  image: ImageResponse
}
export interface BranchResponseSuccess {}

export type BranchRequestFailure = Record<keyof BranchRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
