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
