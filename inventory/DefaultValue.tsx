import { UserRequest, ViewPointType } from '@/types'
import { BranchRequest } from '@/types/branch/branch'
import { CategoryResponse } from '@/types/category/category'
import { GoodsRequest } from '@/types/goods/goods'
import { NewsRequest } from '@/types/news/news'
import { OrderResponse } from '@/types/order/order'
import { RequestBranchRequest } from '@/types/request/request'
import { RequestCreateResponse } from '@/types/requestDetail/requestDetail'

export const DefaultCategory: CategoryResponse = {
  categoryId: '',
  name: '',
  description: '',
  status: 0,
}

export const DefaultUserRequest: UserRequest = {
  fullName: '',
  loginName: '',
  phoneNumber: '',
  address: '',
  email: '',
}
export const DefaultOrder: OrderResponse = {
  ordersId: '',
  customerId: '',
  customerName: '',
  branchId: '',
  createdDate: '',
  totalPrice: 0,
  shippedDate: '',
  address: '',
  province: '',
  ward: '',
  district: '',
  couponId: 0,
  status: '',
  couponCode: '',
  approvedDate: '',
  cancelledDate: '',
  reason: '',
}
export const DefaultCreateRequest: RequestCreateResponse = {
  goodsId: '',
  quantity: 1,
  applyPrice: 0,
}
export const DefaultListDetail: RequestCreateResponse[] = []
export const DefaultRequest: RequestBranchRequest = {
  requestId: '',
  branchId: '',
  createdBy: '',
  createdDate: '',
  status: '',
  approvedBy: '',
  approvedDate: '',
  completedDate: '',
  cancelledDate: '',
  reason: '',
  totalPrice: 0,
  listRequestDetail: [
    {
      goodsId: '',
      quantity: 0,
      applyPrice: 0,
    },
  ],
}
export const DefaultGoods: GoodsRequest = {
  goodsId: '',
  name: '',
  code: '',
  applyPrice: 0,
  innerPrice: 0,
  description: '',
  isTransfer: 0,
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
  longitude: '',
  latitude: '',
  status: 0,
  createdDate: '',
  cancelledDate: '',
  district: '',
  province: '',
  ward: '',
  street: '',
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
