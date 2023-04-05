import { Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
import { GoodsRequest } from '@/types/goods/goods'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Categories from './Categories'
import Product from './Product'

export default function GoodList() {
  const [page, setPage] = useState<number>(1)
  const translate = useTranslationFunction()
  const [goodItem, setGoodItem] = useState<GoodsRequest[]>([])
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  const [categoryId, setCategoryId] = useState<number>()
  const pageSize = '8'

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
        params: { status: 1 },
      }),
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
    handleError(status, message) {
      toast.error(translate(message))
    },
    preventLoadingGlobal: true,
  })

  const goods = useApiCall<CommonListResultType<GoodsRequest>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: page.toString(), pageSize, status: 1, categoryId: categoryId || '' },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message, data) {
      setGoodItem(data.data)
    },
    preventLoadingGlobal: true,
  })
  const { data, loading, setLetCall } = goods
  useEffect(() => {
    category.setLetCall(true)
    setLetCall(true)
  }, [page])

  const filterItems = (categoryId: number) => {
    if (categoryId === -1) {
      if (data) {
        setCategoryId(undefined)
        setLetCall(true)
        return
      }
    }
    if (data) {
      setCategoryId(categoryId)
      setLetCall(true)
    }
  }
  return (
    <main>
      {!loading && (
        <section style={{ padding: '1rem 0', width: '90vw', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>OUR MENU</h2>
            <div
              style={{ width: '5rem', height: '0.25rem', background: '#2c2891', margin: '0 auto' }}
            />
          </div>
          <Categories category={cateItem} categoryId={categoryId} filterItems={filterItems} />
          <Product items={goodItem} />
        </section>
      )}
      {!loading && (
        <Pagination
          total={goods.data?.result?.totalRows || 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: '50%',
            transform: 'translateX(-15%)',
          }}
        />
      )}
    </main>
  )
}
