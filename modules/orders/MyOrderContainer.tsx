import { Button, CustomTable, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { OrderResponse } from '@/types/order/order'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoMdListBox } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const MyOrderContainer = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const translate = useTranslationFunction()
  const pixel = useResponsive()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const router = useRouter()

  const [page, setPage] = useState<number>(1)

  const result = useApiCall<CommonListResultType<OrderResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.order.getOrders,
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
    if (cookies.token) {
      setLetCall(true)
    }
  }, [page])

  const dataField: ViewPointType[] = [
    {
      key: 'customerName',
      label: 'customerName',
    },
    {
      key: 'createdDate',
      label: 'createdDate',
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

  if (!result.data?.result.totalRows) {
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 210px)',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          maxWidth: 1024,
          margin: pixel >= 1000 ? 'auto' : '10px 20px',
        }}
      >
        <div
          style={{
            marginTop: 80,
            backgroundColor: themeValue[darkTheme].colors.redHighland,
            borderRadius: '100%',
            width: 150,
            aspectRatio: '1 / 1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IoMdListBox size={80} color={themeValue[darkTheme].colors.background} />
        </div>
        <strong style={{ color: themeValue[darkTheme].colors.redHighland }}>
          ĐẶT HÀNG THÀNH CÔNG
        </strong>
        <Button onClick={() => router.push('/goods/listgoods')}>
          BẠN CHƯA CÓ ĐƠN ĐẶT HÀNG NÀO
        </Button>
      </div>
    )
  }

  return (
    <div style={{ width: 'max-content', margin: 'auto', marginBottom: 10 }}>
      <h2 style={{ color: themeValue[darkTheme].colors.redHighland }}>ĐƠN HÀNG CỦA BẠN</h2>
      <CustomTable
        idFiled="ordersId"
        detailPath="my-order/"
        header={dataField ?? []}
        body={data ? data.result.data : []}
        loading={loading}
      >
        <>{null}</>
      </CustomTable>
      <div style={{ width: 'max-content', margin: 'auto' }}>
        {!loading && (
          <Pagination
            pageSize={10}
            total={data?.result?.totalRows ?? 0}
            onChange={(number) => setPage(number)}
            page={page}
            paginationStyle={{ marginTop: 20 }}
          />
        )}
      </div>
    </div>
  )
}
