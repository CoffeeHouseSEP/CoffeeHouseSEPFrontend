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
export interface NewItem {
  newsId: number
  title: string
  content: string
  createBy: string
  createdDate: string
  status: number
  createByName: string
}
