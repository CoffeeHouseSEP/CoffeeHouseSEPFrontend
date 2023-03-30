export interface ProfileResponse {
  fullName: string
  loginName: string
  address: string
  phoneNumber: string
  email: string
}

export interface ProfileRequest {
  fullName: string
  loginName: string
  address: string
  phoneNumber: string
  email: string
}

export type ProfileRequestFailure = Record<keyof ProfileRequest, string>
