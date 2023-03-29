import { UserRequest, ViewPointType } from '@/types'
import { BranchRequest } from '@/types/branch/branch'
import { CategoryResponse } from '@/types/category/category'
import { NewsResponse } from '@/types/news/news'

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
export const DefaultBranch: BranchRequest = {
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
export const DefaultNews: NewsResponse = {
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
