import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { CategoryResponse } from '@/types/category/category'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const CateManagement = () => {
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const categoryCreatePascal = useTranslation('CategoryCreatePascal')

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<CategoryResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
        params: { page: String(page) },
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
  }, [])

  const dataField: ViewPointType[] = [
    {
      key: 'categoryId',
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
      key: 'status',
      label: 'status',
    },
  ]

  const handleRedirectCreate = () => {
    router.push('/admin/category/create')
  }

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRedirectCreate}>{categoryCreatePascal}</Button>
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
        idFiled="categoryId"
        detailPath="admin/category/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((cate) => {
                return { ...cate, status: cate.status === 1 ? 'active' : 'deactivate' }
              })
            : []
        }
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
