import { Button, CustomTable } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType, ViewPointType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function CategoryManagement() {
  const router = useRouter()

  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const categoryCreatePascal = useTranslation('categoryCreate')
  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const breadCrumb = useGetBreadCrumb()
  const dataField: ViewPointType[] = [
    {
      key: 'categoryId',
      label: 'id',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'status',
      label: 'Status',
    },
  ]
  const handleRedirectCreate = () => {
    router.push('/category/create')
  }
  const { data, loading, setLetCall } = category
  useEffect(() => {
    setLetCall(true)
  }, [])
  return (
    <div>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {/* {breakPoint > 1 ? (
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
        )} */}
        <Button onClick={handleRedirectCreate}>{categoryCreatePascal}</Button>
      </div>

      <CustomTable header={dataField ?? []} body={data ? data.result.data : []} loading={loading}>
        <>{null}</>
      </CustomTable>
    </div>
  )
}
