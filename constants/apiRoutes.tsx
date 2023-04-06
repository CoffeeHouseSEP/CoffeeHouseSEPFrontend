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
}
