import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: 0,
  breakPoint: 1,
  reloadCart: true,
  language: {
    isDisabled: 'Trạng thái',
    userFullName: 'Tên đầy đủ',
    CategoryCreatePascal: 'Tạo danh mục',
    cancel: 'Hủy',
    edit: 'Sửa',
    save: 'Lưu',
    saveLabel: 'Lưu',
    BranchCreatePascal: 'Tạo chi nhánh',
    UserManagement: 'User Management',
    BranchManagement: 'Branch Management',
    Dashboard: 'Dashboard',
    CategoryManagement: 'Category Management',
    GoodsManagement: 'Goods Management',
    createUserButton: 'Tạo tài khoản quản lý',
    loginName: 'Tên đăng nhập',
    phoneNumber: 'SĐT',
    createdDate: 'Ngày khởi tạo',
    status: 'Trạng thái',
    userLoginName: 'Tên đăng nhập',
    userPhoneNumber: 'SĐT',
    userEmail: 'Email',
    userAddress: 'Địa chỉ',
    categoryId: 'Mã danh mục',
    nameCate: 'Category name',
    descriptionCate: 'Mô tả',
    nameBranch: 'Tên chi nhánh',
    descriptionBranch: 'Mô tả',
    addressBranch: 'Địa chỉ',
    phoneNumberBranch: 'SĐT',
    longitude: 'Kinh độ',
    latitude: 'Vĩ độ',
    branchManagerId: 'Mã quản lý',
    branchId: 'Mã chi nhánh',
    branchManagerName: 'Tên quản lý',
    nameGoods: 'Tên hàng hóa',
    description: 'Mô tả',
    code: 'Mã hàng hóa',
    goodsUnit: 'Đơn vị hàng hóa',
    innerPrice: 'Giá nội bộ',
    applyPrice: 'Giá áp dụng',
    isSold: 'Đã bán hết',
    isSize: 'Có kích cỡ',
    name: 'Tên danh mục',
    goodsId: 'Mã hàng hóa',
    GoodCreatePascal: 'Tạo hàng hóa',
    NewsManagement: 'News Management',
    nameUser: 'Tên đầy đủ',
    settings: 'Cài đặt',
    signOut: 'Đăng xuất',
    NewsCreatePascal: 'Tạo tin tức mới',
    newsId: 'Mã tin tức',
    title: 'Tiều đề',
    createdBy: 'Tạo bởi',
    content: 'Nội dung',
    password: 'Mật khẩu',
    signIn: 'Sign in',
    forgotPassword: 'Forgot password',
    internalAccount: '',
    forbidden: 'Từ chối truy cập',
    RequestManagement: 'Request Management',
    requestId: 'Mã yêu cầu',
    requestDetailId: 'Mã thông tin yêu cầu',
    totalPrice: 'Tổng giá',
    approvedBy: 'Người chấp thuận',
    quantity: 'Số lượng',
    ApproveRequest: 'Cho phép yêu cầu',
    CancelRequest: 'Hủy yêu cầu',
    OrderManagement: 'Order Management',
    ordersId: 'Mã đơn hàng',
    customerId: 'Mã khách hàng',
    shippedDate: 'Ngày giao',
    couponId: 'Mã giảm giá',
    customerName: 'Tên khách hàng',
    size: 'Kích cỡ',
    orderDetailId: 'Mã thông tin đơn hàng',
    goodsName: 'Tên sản phẩm',
    branchName: 'Tên chi nhánh',
    completedDate: 'Ngày hoàn thành',
    cancelledDate: 'Ngày hủy',
    CompleteRequest: 'Hoàn thành yêu cầu',
    Save: 'Lưu',
    RequestCreatePascal: 'Tạo yêu cầu',
    SendRequest: 'Gửi yêu cầu',
    Confirm: 'Xác nhận',
    couponCOde: 'Mã giảm giá',
    expiredDateCoupon: 'Ngày hết hạn',
    percentCoupon: 'Giảm',
    maxValuePromotion: 'Giá trị giảm tối đa',
    categoryName: 'Tên danh mục',
    couponCode: 'Mã giảm giá',
    appliedDateCoupon: 'Ngày áp dụng',
    CouponManagement: 'Coupon Management',
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
    setReloadCrt: (state, actions: PayloadAction<boolean>) => {
      state.reloadCart = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const {
  resetShareStore,
  setLoading,
  setLanguage,
  setBreakPoint,
  resetLoading,
  setReloadCrt,
} = ShareStoreSlice.actions

export default ShareStoreSlice
