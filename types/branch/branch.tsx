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
  image: {
    id: number
    objectId: string
    base64: string
    prefix: string
  }
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
  image: {
    id: number
    objectId: string
    base64: string
    prefix: string
  }
}
export interface BranchResponseSuccess {}

export type BranchRequestFailure = Record<keyof BranchRequest, string>
export type ViewPointType = { key: string; label: string }
export type ViewPointKey = { [key: string]: ViewPointType[] }
