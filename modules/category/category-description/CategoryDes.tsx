import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType, GoodsItem } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CategoryItemView from './CategoryItem'

export default function CategoryDes() {
  const translate = useTranslationFunction()
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  //   const router = useRouter()
  const [goodList, setGoodList] = useState<GoodsItem[]>([])
  const pageSize = '10'
  // const { data, loading, setLetCall } = category
  const goods = useApiCall<CommonListResultType<GoodsItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: '1', pageSize },
      }),
    handleSuccess(message, data) {
      setGoodList(data.data)
    },
    preventLoadingGlobal: true,
  })

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
    preventLoadingGlobal: true,
  })
  const { loading, setLetCall } = category
  useEffect(() => {
    setLetCall(true)
    goods.setLetCall(true)
  }, [])
  return (
    <>
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <CategoryItemView goodList={goodList} list={cateItem} />
        </div>
      )}
    </>
  )
}
