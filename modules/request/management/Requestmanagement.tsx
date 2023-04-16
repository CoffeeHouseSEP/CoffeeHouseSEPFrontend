import { CustomTable, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { RequestBranchRequest } from '@/types/request/request'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const RequestManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<RequestBranchRequest>, String>({
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

  const dataField: ViewPointType[] = [
    {
      key: 'requestId',
      label: 'requestId',
    },
    {
      key: 'branchName',
      label: 'branchName',
    },
    {
      key: 'createdBy',
      label: 'createdBy',
    },

    {
      key: 'approvedBy',
      label: 'approvedBy',
    },
    {
      key: 'createdDate',
      label: 'createdDate',
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
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
      </div>
      <CustomTable
        idFiled="requestId"
        detailPath="admin/request/"
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
