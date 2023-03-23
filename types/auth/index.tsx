export interface LoginRequest {
  loginName: string
  loginPassword: string
}

export enum TypeAccount {
  INTERNAL,
  EXTERNAL,
}

export interface LoginResponseSuccess {
  token: string
  tokenType: string
  role: 'ADMIN' | 'USER' | 'BRANCH_MANAGER'
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
