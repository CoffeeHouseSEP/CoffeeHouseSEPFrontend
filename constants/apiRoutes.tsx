export const apiRoute = {
  category: {
    getListCategory: '/category/get-list-category',
    updateCategory: '/category/update-category',
    createCategory: '/category/add-new-category',
  },
  news: {
    getListNews: '/news/get-list-news',
    createNews: '/news/add-new-news',
    updateNews: '/news/update-news',
  },
  goods: {
    getListGoods: '/goods/get-list-goods',
    createGoods: '/goods/add-new-goods',
    updateGoods: '/goods/update-goods',
    getListGoodsByAuthorized: '/goods/get-list-goods-authorized',
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
  },
}
