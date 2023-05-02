import { Button, CustomTable, Dropdown, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, postMethod } from '@/services'
import { CommonListResultType, OptionsType, UserResponseSuccess, ViewPointType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const UserManagement = () => {
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, ROLE_COOKIE])
  const [filter, setFilter] = useState<'USER' | 'BRANCH_MANAGER'>('USER')

  const router = useRouter()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<UserResponseSuccess>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getListUser,
        token: cookies.token,
        params: { page: String(page), role: filter },
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
    if (filter && cookies.token) {
      setLetCall(true)
    }
  }, [page, filter])

  const createUserButton = useTranslation('createUserButton')

  const options: OptionsType<'USER' | 'BRANCH_MANAGER'>[] = [
    {
      label: 'Người dùng',
      value: 'USER',
    },
    {
      label: 'Quản lý chi nhánh',
      value: 'BRANCH_MANAGER',
    },
  ]

  const [select, setSelect] = useState<string[]>([])

  const enable = useApiCall<string, String>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.user.activeUser,
        params: { id: select[0] },
        token: cookies.token,
      }),
    handleSuccess(message) {
      toast.success(message)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const disable = useApiCall<string, String>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.user.deActiveUser,
        params: { id: select[0] },
        token: cookies.token,
      }),
    handleSuccess(message) {
      toast.success(message)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Quản lý người dùng</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Quản lý người dùng</h2>
        {breakPoint > 1
          ? cookies.role === 'ADMIN' && (
              <Button onClick={handleRedirectCreate}>{createUserButton}</Button>
            )
          : cookies.role === 'ADMIN' && (
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
      {cookies.role === 'ADMIN' && (
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 10 }}>
          <Button
            onClick={() => enable.setLetCall(true)}
            disabled={select.length === 0}
            color="primary"
          >
            Kích hoạt
          </Button>
          <Button
            onClick={() => disable.setLetCall(true)}
            disabled={select.length === 0}
            color="warning"
          >
            Hủy kích hoạt
          </Button>
        </div>
      )}
      {cookies.role === 'ADMIN' && (
        <Dropdown<'USER' | 'BRANCH_MANAGER'>
          options={options}
          button="Lọc theo quyền"
          onClick={(value: 'USER' | 'BRANCH_MANAGER') => setFilter(value)}
          isCloseSelect
        />
      )}
      <CustomTable
        idFiled="id"
        detailPath="admin/user/"
        header={dataField ?? []}
        selectionMode="single"
        selectedKeys={select}
        handleChangeSelection={setSelect}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, status: user.status === 1 ? 'Hoạt động' : 'Không hoạt động' }
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
