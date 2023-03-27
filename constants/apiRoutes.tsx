export const apiRoute = {
  category: {
    getListCategory: '/category/get-list-category',
    updateCategory: '/category/update-category',
    createCategory: '/category/add-new-category',
  },
  new: {
    getListNews: '/news/get-list-news',
  },
  goods: {
    getListGoods: '/goods/get-list-goods',
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
  },
}
