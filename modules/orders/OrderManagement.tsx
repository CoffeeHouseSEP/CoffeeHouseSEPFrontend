import { Button, CustomTable, Input, Modal, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { OrderResponse } from '@/types/order/order'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const OrderManagement = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, ROLE_COOKIE])
  const translate = useTranslationFunction()

  const [select, setSelect] = useState<string[]>([])

  const [page, setPage] = useState<number>(1)

  const breadCrumb = useGetBreadCrumb()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const [isOpen, setIsOpen] = useState(false)

  const [reason, setReason] = useState('')

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
    setLetCall(true)
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
      key: 'shippedDate',
      label: 'shippedDate',
    },
    {
      key: 'couponCode',
      label: 'couponCode',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  const approve = useApiCall<string, String>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.order.approveOrders,
        token: cookies.token,
        params: { ordersId: select[0] },
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

  const cancel = useApiCall<string, String>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.order.cancelOrders,
        token: cookies.token,
        params: { ordersId: select[0], cancelReason: reason },
      }),
    handleSuccess(message) {
      setReason('')
      setIsOpen(false)
      setLetCall(true)
      toast.success(message)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const complete = useApiCall<string, String>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.order.completeOrder,
        token: cookies.token,
        params: { ordersId: select[0] },
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
      <Modal open={isOpen} preventClose>
        <h3>Cancel order</h3>
        <Input
          underlined
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              cancel.setLetCall(true)
            }}
          >
            Submit
          </Button>
          <Button
            color="warning"
            onClick={() => {
              setIsOpen(false)
              setSelect([])
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 10 }}>
        <Button
          onClick={() => complete.setLetCall(true)}
          disabled={select.length === 0}
          color="primary"
        >
          Complete order
        </Button>
        <Button
          onClick={() => approve.setLetCall(true)}
          disabled={select.length === 0}
          color="primary"
        >
          Approve order
        </Button>
        <Button onClick={() => setIsOpen(true)} disabled={select.length === 0} color="warning">
          Cancel order
        </Button>
      </div>
      <CustomTable
        idFiled="ordersId"
        detailPath="admin/orders/"
        header={dataField ?? []}
        body={data ? data.result.data : []}
        loading={loading}
        selectedKeys={select}
        handleChangeSelection={setSelect}
        selectionMode={cookies.role === 'BRANCH_MANAGER' ? 'single' : 'none'}
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
