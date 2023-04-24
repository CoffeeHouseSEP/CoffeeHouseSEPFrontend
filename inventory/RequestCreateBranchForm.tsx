import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { RequestFailure } from '@/types/request/request'
import { RequestCreateResponse } from '@/types/requestDetail/requestDetail'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { inputStyles } from './Styles'

interface IRequestCreateBranchForm {
  request: RequestCreateResponse
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<RequestFailure>
  selectGoods?: string
}

export const RequestCreateBranchForm = ({
  onchangeUserState,
  request,
  type,
  errorState,
  selectGoods,
}: IRequestCreateBranchForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const [selectId, setSelectId] = useState<string[]>(selectGoods ? [selectGoods] : [''])

  const GoodsIdLabel = useTranslation('goodsId')
  const QuantityLabel = useTranslation('quantity')
  const result = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoodsByAuthorized,
        token: cookies.token,
        params: { page: String(page), sortField: 'goodsId', isTransfer: '1' },
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
  useEffect(() => {
    if (selectId.length) {
      onchangeUserState({
        goodsId: selectId[0],
      })
    } else {
      onchangeUserState({
        goodsId: '',
      })
    }
  }, [selectId])
  const dataField: ViewPointType[] = [
    {
      key: 'goodsId',
      label: 'goodsId',
    },
    {
      key: 'name',
      label: 'name',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
  ]
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
          gap: 16,
        }}
      >
        <div>
          <Input
            readOnly
            value={request.goodsId}
            label={GoodsIdLabel}
            onChange={() => {}}
            {...inputStyles({
              error: errorState?.branchId && translate(errorState.branchId),
            })}
          />
        </div>
        <div>
          <Input
            label={QuantityLabel}
            value={request.quantity}
            onChange={(event) => {
              onchangeUserState({
                quantity: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.branchId && translate(errorState.branchId),
            })}
          />
        </div>
      </div>
      <CustomTable
        idFiled="goodsId"
        detailPath="admin/goods/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, status: user.status === 1 ? 'active' : 'deactivate' }
              })
            : []
        }
        selectionMode={type === 'read' ? 'none' : 'single'}
        selectedKeys={selectId}
        loading={loading}
        handleChangeSelection={setSelectId}
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
      {Object.keys(errorState || {}).map((item) => {
        if (errorState && errorState[item as keyof typeof errorState]) {
          return (
            <div
              style={{
                marginTop: 30,
                fontSize: '20px',
                paddingLeft: '4px',
                color: themeValue.dark.colors.redHighland,
              }}
            >
              {errorState[item as keyof typeof errorState]}
            </div>
          )
        }
        return ''
      })}
    </>
  )
}
