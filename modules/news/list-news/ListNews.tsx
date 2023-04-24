import { Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType, NewItem } from '@/types'
import { useEffect, useState } from 'react'
import NewsItem from './NewItem'

export default function ListNews() {
  const [page, setPage] = useState<number>(1)
  const pageSize = '6'
  const [newList, setNewList] = useState<NewItem[]>([])
  const news = useApiCall<CommonListResultType<NewItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.news.getListNews,
        params: { page: page.toString(), pageSize },
      }),
    handleSuccess(message, data) {
      setNewList(data.data)
    },
    preventLoadingGlobal: true,
  })
  const { setLetCall } = news
  useEffect(() => {
    setLetCall(true)
  }, [page])

  const pixel = useResponsive()

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10rem 0 4rem 0' }}>
        <h1>NEWS</h1>
        <div style={{ width: '8rem', height: '0.25rem', background: '#333', margin: '0 auto' }} />
      </div>
      <section style={{ width: '75vw', maxWidth: '90vw', margin: '2rem auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${pixel <= 900 ? 1 : 3}, minmax(300px,1fr)`,
            gap: 20,
            marginBottom: '4rem',
          }}
        >
          <NewsItem list={newList} />
        </div>
      </section>
      <Pagination
        total={news.data?.result?.totalRows || 0}
        onChange={(number) => setPage(number)}
        page={page}
        pageSize={6}
        paginationStyle={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: '50%',
          transform: 'translateX(-15%)',
        }}
      />
    </div>
  )
}
