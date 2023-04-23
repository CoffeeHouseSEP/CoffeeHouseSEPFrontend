export interface NavBarItemType {
  label: string
  path: string
  children?: NavBarItemType[]
}

export interface CategoryItem {
  categoryId: string
  name: string
  description: string
  status: number
}
export interface NewItem {
  newsId: string
  title: string
  content: string
  createBy: string
  createdDate: string
  status: number
  createByName: string
}
export interface GoodsItem {
  id: number
  goodsId: string
  name: string
  code: string
  applyPrice: number
  description: string
  status: number
  categoryId: string
  innerPrice: number
}
