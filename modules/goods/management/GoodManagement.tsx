import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodResponse } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const GoodManagement = () => {
  const [page, setPage] = useState<number>(1)

  const pageSize = '6'

  //   const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const router = useRouter()

  const GoodCreatePascal = useTranslation('GoodCreatePascal')

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<GoodResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: page.toString(), pageSize },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = result
  useEffect(() => {
    setLetCall(true)
  }, [page])

  const dataField: ViewPointType[] = [
    {
      key: 'goodsId',
      label: 'categoryId',
    },
    {
      key: 'name',
      label: 'name',
    },
    {
      key: 'description',
      label: 'description',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
    {
      key: 'categoryName',
      label: 'categoryName',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  const handleRedirectCreate = () => {
    router.push('/admin/good/create')
  }

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRedirectCreate}>{GoodCreatePascal}</Button>
        ) : (
          <FloatButton
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              aspectRatio: '1 / 1',
            }}
            onClick={handleRedirectCreate}
          >
            <IoIosCreate style={{ width: '50%', height: '50%' }} />
          </FloatButton>
        )}
      </div>
      <CustomTable
        idFiled="goodsId"
        detailPath="admin/good/"
        header={dataField ?? []}
        body={data ? data.result.data : []}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          pageSize={6}
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
