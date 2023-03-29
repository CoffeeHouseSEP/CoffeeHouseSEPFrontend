import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, UserResponseSuccess, ViewPointType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const UserManagement = () => {
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<UserResponseSuccess>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getListUser,
        token: cookies.token,
        params: { page: String(page) },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = result

  const dataField: ViewPointType[] = [
    {
      key: 'loginName',
      label: 'loginName',
    },
    {
      key: 'phoneNumber',
      label: 'phoneNumber',
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
    router.push('/admin/user/create')
  }

  useEffect(() => {
    setLetCall(true)
  }, [page])

  const createUserButton = useTranslation('createUserButton')

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRedirectCreate}>{createUserButton}</Button>
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
        idFiled="id"
        detailPath="admin/user/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, status: user.status === 1 ? 'active' : 'deactivate' }
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
