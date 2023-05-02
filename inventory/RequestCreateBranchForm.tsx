import { CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { VND, themeValue } from '@/lib'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { RequestFailure } from '@/types/request/request'
import { RequestCreateResponse } from '@/types/requestDetail/requestDetail'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface IRequestCreateBranchForm {
  request: RequestCreateResponse[]
  onchangeUserState: (value: RequestCreateResponse[]) => void
  type: 'read' | 'update'
  errorState?: Partial<RequestFailure>
}

export const RequestCreateBranchForm = ({
  onchangeUserState,
  request,
  type,
  errorState,
}: IRequestCreateBranchForm) => {
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)

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
      label: 'goodsName',
    },
    {
      key: 'categoryName',
      label: 'categoryName',
    },
    {
      key: 'innerPrice',
      label: 'innerPrice',
    },
  ]
  const inputItem = (data: { [key: string]: any }) => {
    const item = data as RequestCreateResponse
    return (
      <Input
        labelLeft="SL"
        value={request.find((thisItem) => thisItem.goodsId === item.goodsId)?.quantity || ''}
        disabled={!request.find((thisItem) => thisItem.goodsId === item.goodsId)}
        onChange={(e) => {
          if (e.target.value && Number.isFinite(Number(e.target.value))) {
            let newList: RequestCreateResponse[] = []
            newList = request.map((itemThis) => {
              if (itemThis.goodsId === item.goodsId)
                return { ...itemThis, quantity: Number(e.target.value) }
              return itemThis
            })
            onchangeUserState(newList)
          }
          if (!e.target.value) {
            let newList: RequestCreateResponse[] = []
            newList = request.map((itemThis) => {
              if (itemThis.goodsId === item.goodsId) return { ...itemThis, quantity: 0 }
              return itemThis
            })
            onchangeUserState(newList)
          }
        }}
      />
    )
  }

  return (
    <>
      <CustomTable
        listActions={[
          {
            content: 'string',
            icon: inputItem,
            func: () => {},
          },
        ]}
        idFiled="goodsId"
        detailPath="admin/goods/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, innerPrice: VND.format(user.innerPrice) }
              })
            : []
        }
        selectionMode={type === 'read' ? 'none' : 'multiple'}
        selectedKeys={request.map((item) => item.goodsId)}
        loading={loading}
        handleChangeSelection={(value: string[]) => {
          let newList: RequestCreateResponse[] = []
          value.forEach((select) => {
            const thisF = request.find((da) => da.goodsId === select)
            if (thisF) {
              newList = [...newList, thisF]
            } else {
              newList = [
                ...newList,
                {
                  goodsId: select,
                  quantity: 1,
                  applyPrice:
                    result.data?.result.data.find((da) => da.goodsId === select)?.innerPrice || 0,
                },
              ]
            }
          })
          onchangeUserState(newList)
        }}
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
