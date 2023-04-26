import { Button, CustomTable, Input, Pagination } from '@/components'
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
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
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
}: IRequestCreateBranchForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)

  const GoodsIdLabel = useTranslation('goodsId')
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

  const dataField: ViewPointType[] = [
    {
      key: 'name',
      label: 'name',
    },
    {
      key: 'categoryName',
      label: 'categoryName',
    },
    {
      key: 'applyPrice',
      label: 'applyPrice',
    },
  ]

  const setQuantity = (id: number) => {
    if (id <= 1) {
      onchangeUserState({ quantity: 1 })
    } else {
      onchangeUserState({ quantity: id })
    }
  }

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="button"
            onClick={() => setQuantity(request.quantity)}
            color="primary"
            styleType="light"
          >
            <AiFillLeftCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
          </Button>
          {/* amount */}
          <p style={{ fontSize: '2rem', margin: '10px 10px', color: '#000' }}>{request.quantity}</p>
          {/* decrease amount */}
          <Button
            color="primary"
            type="button"
            onClick={() => setQuantity(request.quantity + 1)}
            styleType="light"
          >
            <AiFillRightCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
          </Button>
        </div>
      </div>
      <CustomTable
        listActions={[]}
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
        selectedKeys={[request.goodsId]}
        loading={loading}
        handleChangeSelection={(value: string[]) =>
          onchangeUserState({ goodsId: value.length > 0 ? value[0] : '' })
        }
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
