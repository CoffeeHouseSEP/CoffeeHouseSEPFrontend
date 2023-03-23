import { UserResponseSuccess, ViewPointType } from '@/types'
import { CategoryResponse } from '@/types/category/category'
import { GoodRequest, GoodResponse } from '@/types/goods/goods'

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
export const DefaulRequesttGood: GoodRequest = {
  goodsId: '',
  name: '',
  code: '',
  applyPrice: 0,
  innerPrice: 0,
  description: '',
  status: 0,
  categoryId: '',
  image: {
    id: '',
    objectId: '',
    base64: '',
    prefix: '',
  },
}
export const DefaultResponseGood: GoodResponse = {
  goodsId: '',
  name: '',
  code: '',
  applyPrice: 0,
  innerPrice: 0,
  description: '',
  status: 0,
  categoryId: '',
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
