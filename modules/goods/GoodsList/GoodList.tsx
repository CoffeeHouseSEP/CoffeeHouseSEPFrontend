import { Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Categories from './Categories'
import Product from './Product'

export default function GoodList() {
  const [page, setPage] = useState<number>(1)
  const translate = useTranslationFunction()
  const [goodItem, setGoodItem] = useState<GoodsResponse[]>([])
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  const router = useRouter()
  const [categoryId, setCategoryId] = useState<string | undefined>()
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

  const goods = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: page.toString(),
          pageSize,
          status: 1,
          categoryId: categoryId || '',
          keySort: 'DESC',
          sortField: 'categoryId',
        },
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
    if (category.data?.result.data.length) {
      setLetCall(true)
    }
  }, [category.data, categoryId, page])

  useEffect(() => {
    category.setLetCall(true)
  }, [])

  useEffect(() => {
    if (category.data?.result.data.length) {
      const categoryIdParam = router.query.categoryId
      const findCate = cateItem.find((item) => item.categoryId === String(categoryIdParam))
      setCategoryId(findCate?.categoryId)
    }
  }, [router, category.data])

  const filterItems = (categoryId: string) => {
    if (categoryId === '-1') {
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
        <section style={{ padding: '1rem 0', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>MENU</h2>
            <div
              style={{
                width: '5rem',
                height: '0.25rem',
                background: themeValue.light.colors.redHighland,
                margin: '0 auto',
              }}
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
