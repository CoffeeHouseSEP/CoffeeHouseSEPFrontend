export const apiRoute = {
  category: {
    getListCategory: '/category/get-list-category',
    updateCategory: '/category/update-category',
    createCategory: '/category/add-new-category',
    getListAuthorized: '/category/get-list-category-authorized',
  },
  news: {
    getListNews: '/news/get-list-news',
    createNews: '/news/add-new-news',
    updateNews: '/news/update-news',
    getListAuthorized: '/news/get-list-news-authorized',
  },
  goods: {
    getListGoods: '/goods/get-list-goods',
    createGoods: '/goods/add-new-goods',
    updateGoods: '/goods/update-goods',
    getListGoodsByAuthorized: '/goods/get-list-goods-authorized',
    getListGoodsBranch: '/goods/get-list-goods-branch-manager',
  },
  branch: {
    getListBranch: '/branch/get-list-branch',
    addBranch: '/branch/add-new-branch',
    updateBranch: '/branch/update-branch',
    getBranchByManagerid: '/branch/get-branch-by-manager-id',
  },
  auth: {
    login: '/authentication/login',
    logout: '/authentication/logout',
  },
  user: {
    getListUser: '/user-internal/get-list-users',
    addUser: '/user-internal/add-new-user',
    detailUser: '/user-internal/get-user-detail',
    updateUser: '/user-internal/update-user',
    forgotPass: '/user-internal/forgot-password',
    register: '/user-internal/register',
    activeUser: '/user-internal/active-user',
    deActiveUser: '/user-internal/de-active-user',
  },
  image: {
    imageInfo: '/image-info/get-image-by-object-id',
    removeImage: '/image-info/remove-image-info',
  },
  profile: {
    getProfile: '/user-internal/get-user-profile',
    updateProfile: '/user-internal/update-user-profile',
    changePass: '/user-internal/change-password',
  },
  request: {
    getRequest: '/request/get-list-request',
    addRequest: '/request/add-new-request',
    updateRequest: '/request/update-request',
    sendRequest: '/request/send-request',
    completeRequest: '/request/complete-request',
    cancelRequest: '/request/cancel-request',
    approveRequest: '/request/approve-request',
    requestDetailRequest: '/request-detail/get-list-request-detail-by-request-id',
  },
  order: {
    getOrders: '/orders/get-list-orders',
    approveOrders: '/orders/approve-orders',
    cancelOrders: '/orders/cancel-orders',
    orderDetail: '/order-detail/get-list-order-detail-by-order-id',
    createOrder: '/orders/create-orders',
    completeOrder: '/orders/complete-orders',
  },
  address: {
    addressProvince: '/address/get-list-province',
    addressDistrict: '/address/get-list-district-by-province-code',
  },
  appParams: {
    getAppPrams: '/app-param/get-list-app-param-by-par-type',
  },
  coupon: {
    getCouponForCart: '/coupon/get-list-coupon-by-cart-info',
    getList: '/coupon/get-list-coupon',
    addNew: '/coupon/add-new-coupon',
    updateCoupon: '/coupon/update-coupon',
  },
  disableGoodsBranch: {
    getListDisable: '/branch-goods-disable/get-list-goods-disable',
    branchGoodsDisable: '/branch-goods-disable/disable-goods-from-branch',
    branchGoodsEnable: '/branch-goods-disable/enable-goods-from-branch',
  },
  dashboard: {
    getDashboard: '/admin-dashboard/get-list-branch-revenue',
  },
}
