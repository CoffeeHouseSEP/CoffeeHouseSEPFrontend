import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: 0,
  breakPoint: 1,
  language: {
    CategoryCreatePascal: 'Create category',
    cancel: 'cancel',
    edit: 'edit',
    save: 'save',
    saveLabel: 'Save',
    BranchCreatePascal: 'Create branch',
    UserManagement: 'User Management',
    BranchManagement: 'Branch Management',
    Dashboard: 'Dashboard',
    CategoryManagement: 'Category Management',
    GoodManagement: 'Good Management',
    createUserButton: 'Create user',
    loginName: 'Username',
    phoneNumber: 'Phone',
    createdDate: 'Created Date',
    status: 'Status',
    userLoginName: 'Login name',
    userPhoneNumber: 'Phone number',
    userEmail: 'Email',
    userAddress: 'Address',
    categoryId: 'Category id',
    nameCate: 'Category name',
    descriptionCate: 'Description',
    nameBranch: 'Branch name',
    descriptionBranch: 'Description',
    addressBranch: 'Address',
    phoneNumberBranch: 'Phone number',
    longitude: 'Longitude',
    latitude: 'Latitude',
    branchManagerId: 'Manager id',
    branchId: 'Branch ID',
    branchManagerName: 'Manager name',
    nameGoods: 'Goods Name',
    description: 'Description',
    code: 'code',
    goodsUnit: 'Good Unit',
    innerPrice: 'InnerPrice',
    applyPrice: 'ApplyPrice',
    isSold: 'isSold',
    isSize: 'Size Goods',
    name: 'CategoryName',
    goodsId: 'Goods ID',
    GoodCreatePascal: 'Create Good',
    NewsManagement: 'News Management',
    nameUser: 'Full name',
    settings: 'Settings',
    signOut: 'Sign out',
    NewsCreatePascal: 'Create news',
    newsId: 'News id',
    title: 'Title',
    createdBy: 'Created By',
    content: 'Content',
    password: 'Password',
    signIn: 'Sign in',
    forgotPassword: 'Forgot password',
    internalAccount: 'Login with internal account',
    forbidden: 'Access denied',
    RequestManagement: 'Request Management',
    requestId: 'Request ID',
    requestDetailId: 'RequestDetail ID',
    totalPrice: 'Total Price',
    approvedBy: 'approvedBy',
    quantity: 'Quantity',
    ApproveRequest: 'Approve Request',
    CancelRequest: 'Cancel Request',
    OrderManagement: 'Order Management',
    ordersId: 'Orders ID',
    customerId: 'Customer ID',
    shippedDate: 'ShippedDate',
    couponId: 'Coupon ID',
    customerName: 'Customer Name',
    size: 'Size',
    orderDetailId: 'OrderDetail ID',
    goodsName: 'Goods Name',
  },
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      if (actions.payload) {
        return { ...state, loading: state.loading + 1 }
      }
      if (state.loading > 0) {
        return { ...state, loading: state.loading - 1 }
      }
      return state
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    setBreakPoint: (state, actions: PayloadAction<number>) => {
      state.breakPoint = actions.payload
    },
    resetLoading: (state) => {
      return { ...state, loading: 0 }
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoading, setLanguage, setBreakPoint, resetLoading } =
  ShareStoreSlice.actions

export default ShareStoreSlice
