import { UserRequest, ViewPointType } from '@/types'
import { BranchRequest } from '@/types/branch/branch'
import { CategoryResponse } from '@/types/category/category'
import { GoodsRequest } from '@/types/goods/goods'
import { NewsRequest } from '@/types/news/news'

export const DefaultCategory: CategoryResponse = {
  categoryId: '',
  name: '',
  description: '',
  status: 0,
}

export const DefaultUserRequest: UserRequest = {
  loginName: '',
  phoneNumber: '',
  address: '',
  email: '',
}
export const DefaultGoods: GoodsRequest = {
  goodsId: '',
  name: '',
  code: '',
  applyPrice: 0,
  innerPrice: 0,
  description: '',
  status: 0,
  categoryId: '',
  isSize: 0,
  isSold: 0,
  goodsUnit: 0,
  image: {
    id: 0,
    objectId: '',
    base64: '',
    prefix: '',
  },
}
export const DefaultBranch: BranchRequest = {
  branchId: '',
  name: '',
  address: '',
  phoneNumber: '',
  description: '',
  branchManagerId: '',
  longitude: 0,
  latitude: 0,
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
export const DefaultNews: NewsRequest = {
  newsId: '',
  title: '',
  content: '',
  createdBy: '',
  createdDate: '',
  status: 0,
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
