export interface UserResponseSuccess {
  id: string
  avatar: string
  username: string
  password: string
  gender: number
  dob: string
  address: string
  firstName: string
  lastName: string
  email: string
  phone: string
  tokens: Tokens
  created: string
  modified: string
  verified: boolean
  verify2FA: boolean
  active: number
  type: 'INTERNAL' | 'EXTERNAL'
}

export interface UserNotifications {
  content: string
  sendTime: string
}

export interface UserListSuccess {
  data: UserResponseSuccess[]
  page: number
  pageSize: number
  totalRows: number
}

export interface Tokens {
  [key: string]: Date
}

export type UserDetailFailure = Record<keyof UserResponseSuccess, string>

export interface UserRequest {
  username?: string
  gender?: number
  dob?: string
  address?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  deleted?: number
}

export interface UserConfig {
  notificationId: string
  channelId: string
  eventId: string
}

export type UserRequestFailure = Record<keyof UserRequest, string>
