import { UserResponseSuccess, ViewPointType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { CategoryResponse } from '@/types/category/category'

export const DefaultUser: UserResponseSuccess = {
  id: '',
  username: '',
  password: '',
  gender: 0,
  dob: '',
  address: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tokens: {},
  created: '',
  modified: '',
  verified: false,
  verify2FA: false,
  active: 0,
  avatar: '',
  type: 'INTERNAL',
}
export const DefaultCategory: CategoryResponse = {
  categoryId: '',
  name: '',
  description: '',
  status: 0,
}
export const DefaultBranch: BranchResponse = {
  branchId: '',
  name: '',
  address: '',
  phoneNumber: '',
  description: '',
  branchManagerId: '',
  longitude: '',
  latitude: '',
  status: 0,
  createdDate: '',
  cancelledDate: '',
  image: {
    id: 0,
    objectId: '',
    base64: '',
    prefix: '',
  },
}

export const initUserRequest: ViewPointType[] = [
  { key: 'username', label: 'username' },
  { key: 'gender', label: 'gender' },
  { key: 'dob', label: 'dob' },
  { key: 'address', label: 'address' },
  { key: 'firstName', label: 'firstName' },
  { key: 'lastName', label: 'lastName' },
  { key: 'email', label: 'email' },
  { key: 'phone', label: 'phone' },
  { key: 'deleted', label: 'deleted' },
]
