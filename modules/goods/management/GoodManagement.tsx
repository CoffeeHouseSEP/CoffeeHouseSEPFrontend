import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, postMethod, putMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const GoodManagement = () => {
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const [cookies] = useCookies([ROLE_COOKIE, TOKEN_AUTHENTICATION])

  const [select, setSelect] = useState<string[]>([])

  const router = useRouter()

  const GoodCreatePascal = useTranslation('GoodCreatePascal')

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName:
          cookies.role === 'ADMIN'
            ? apiRoute.goods.getListGoodsByAuthorized
            : apiRoute.goods.getListGoodsBranch,
        params: { page: String(page), pageSize: '10' },
        token: cookies.token,
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

  let dataField: ViewPointType[] = [
    {
      key: 'name',
      label: 'name',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
    {
      key: 'description',
      label: 'description',
    },
    {
      key: 'categoryName',
      label: 'categoryName',
    },
    {
      key: 'goodsUnit',
      label: 'goodsUnit',
    },
    {
      key: 'isSold',
      label: 'isSold',
    },
  ]

  if (cookies.role === 'ADMIN') {
    dataField = [
      ...dataField,
      {
        key: 'status',
        label: 'status',
      },
    ]
  }

  if (cookies.role === 'BRANCH_MANAGER') {
    dataField = [
      ...dataField,
      {
        key: 'isDisabled',
        label: 'isDisabled',
      },
    ]
  }

  const handleRedirectCreate = () => {
    router.push('/admin/good/create')
  }

  const enable = useApiCall<string, String>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.disableGoodsBranch.branchGoodsEnable,
        params: { goodsId: select[0] },
        token: cookies.token,
      }),
    handleSuccess(message) {
      setLetCall(true)
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
        pathName: apiRoute.disableGoodsBranch.branchGoodsDisable,
        params: { goodsId: select[0] },
        token: cookies.token,
      }),
    handleSuccess(message) {
      setLetCall(true)
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
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {breakPoint > 1
          ? cookies.role !== 'BRANCH_MANAGER' && (
              <Button disabled={cookies.role === 'BRANCH_MANAGER'} onClick={handleRedirectCreate}>
                {GoodCreatePascal}
              </Button>
            )
          : cookies.role !== 'BRANCH_MANAGER' && (
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
      {cookies.role === 'BRANCH_MANAGER' && (
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 10 }}>
          <Button
            onClick={() => enable.setLetCall(true)}
            disabled={select.length === 0}
            color="primary"
          >
            Enable product
          </Button>
          <Button
            onClick={() => disable.setLetCall(true)}
            disabled={select.length === 0}
            color="warning"
          >
            Disable product
          </Button>
        </div>
      )}
      <CustomTable
        idFiled="goodsId"
        selectedKeys={select}
        handleChangeSelection={setSelect}
        selectionMode={cookies.role === 'BRANCH_MANAGER' ? 'single' : 'none'}
        detailPath="admin/good/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((good) => {
                return {
                  ...good,
                  status: good.status === 1 ? 'Hoạt động' : 'Không hoạt động',
                  isSold: good.isSold ? 'Đang bán' : 'Bán hết',
                }
              })
            : []
        }
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
