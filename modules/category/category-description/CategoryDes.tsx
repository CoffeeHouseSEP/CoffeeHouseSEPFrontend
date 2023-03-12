import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
import { useEffect, useState } from 'react'
import CategoryItemView from './CategoryItem'

export default function CategoryDes() {
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  //   const router = useRouter()

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
      }),
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
  })

  useEffect(() => {
    category.setLetCall(true)
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <CategoryItemView list={cateItem} />
    </div>
  )
}
