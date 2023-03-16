export interface NavBarItemType {
  label: string
  path: string
  children?: NavBarItemType[]
}

export interface CategoryItem {
  categoryId: number
  name: string
  description: string
  status: number
}
export interface GoodsItem {
  id: number
  goodsId: string
  name: string
  code: string
  applyPrice: number
  description: string
  status: number
  categoryId: number
  innerPrice: number
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
