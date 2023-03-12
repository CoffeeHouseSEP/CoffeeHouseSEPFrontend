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
