import { Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType, GoodsItem } from '@/types'
import { useEffect, useState } from 'react'
import Categories from './Categories'
import Product from './Product'

export default function GoodList() {
  const [page, setPage] = useState<number>(1)
  const [goodItem, setGoodItem] = useState<GoodsItem[]>([])
  const pageSize = '10'
  // const { data, loading, setLetCall } = category
  const goods = useApiCall<CommonListResultType<GoodsItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: page.toString(), pageSize },
      }),
    handleSuccess(message, data) {
      setGoodItem(data.data)
    },
  })
  const { data, loading, setLetCall } = goods
  useEffect(() => {
    setLetCall(true)
  }, [page])

  const filterItems = (categoryId: number) => {
    if (categoryId === -1) {
      if (data) {
        const newGoods = data?.result.data
        setGoodItem(newGoods)
        return
      }
    }
    if (data) {
      const newGoods = data.result.data.filter((item) => item.categoryId === categoryId)
      setGoodItem(newGoods)
    }
  }
  return (
    <main>
      {!loading && (
        <section style={{ padding: '2rem 0', width: '90vw', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>OUR MENU</h2>
            <div
              style={{ width: '5rem', height: '0.25rem', background: '#2c2891', margin: '0 auto' }}
            />
          </div>
          <Categories filterItems={filterItems} />
          <Product items={goodItem} />
        </section>
      )}
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
    </main>
  )
}
