export interface UserResponseSuccess {
  id: string
  loginName: string
  phoneNumber: string
  createdDate: string
  status: number
  email: string
  address: string
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

export interface UserRequest {
  loginName: string
  phoneNumber: string
  email: string
  address: string
}

export type UserRequestFailure = Record<keyof UserRequest, string>
