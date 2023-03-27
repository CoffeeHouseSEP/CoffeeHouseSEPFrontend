import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const BranchManagement = () => {
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const branchCreatePascal = useTranslation('BranchCreatePascal')

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
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
      key: 'branchId',
      label: 'branchId',
    },
    {
      key: 'name',
      label: 'nameBranch',
    },
    {
      key: 'address',
      label: 'addressBranch',
    },
    {
      key: 'phoneNumber',
      label: 'phoneNumberBranch',
    },
    {
      key: 'branchManagerName',
      label: 'branchManagerName',
    },
    {
      key: 'createdDate',
      label: 'createdDate',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  const handleRedirectCreate = () => {
    router.push('/admin/branch/create')
  }

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRedirectCreate}>{branchCreatePascal}</Button>
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
        idFiled="branchId"
        detailPath="admin/branch/"
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
