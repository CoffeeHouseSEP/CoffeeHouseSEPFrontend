import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { RequestBranchResponse } from '@/types/request/request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const RequestBranchManagement = () => {
  const router = useRouter()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<RequestBranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.request.getRequest,
        token: cookies.token,
        params: { page: String(page), pageSize: '10' },
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

  const branchCreatePascal = useTranslation('RequestCreatePascal')
  const handleRedirectCreate = () => {
    router.push('/admin/request-branch/create')
  }
  const dataField: ViewPointType[] = [
    {
      key: 'branchName',
      label: 'branchName',
    },
    {
      key: 'createdByName',
      label: 'createdBy',
    },
    {
      key: 'createdDate',
      label: 'createdDate',
    },
    {
      key: 'approvedByName',
      label: 'approvedBy',
    },
    {
      key: 'completedDate',
      label: 'completedDate',
    },
    {
      key: 'cancelledDate',
      label: 'cancelledDate',
    },
    {
      key: 'totalPrice',
      label: 'totalPrice',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Quản lý yêu cầu</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Quản lý yêu cầu</h2>
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
        idFiled="requestId"
        detailPath="admin/request-branch/"
        header={dataField ?? []}
        body={data ? data.result.data : []}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          pageSize={10}
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
