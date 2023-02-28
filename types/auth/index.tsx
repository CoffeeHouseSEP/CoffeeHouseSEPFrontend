export interface LoginRequest {
  username: string
  password: string
}

export enum TypeAccount {
  INTERNAL,
  EXTERNAL,
}

export interface LoginResponseSuccess {
  userId: string
  token: string
  type: TypeAccount
  verify2Fa: boolean
  needVerify: boolean
}

export type LoginResponseFailure = Record<keyof LoginRequest, string>

export interface SignUpRequest {
  username: string
  password: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
}

export type SignUpFailure = Record<keyof SignUpRequest, string>
