import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultOrder, DefaultRequest } from '@/inventory'
import { OrderForm } from '@/inventory/OrderForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType, UserRequest } from '@/types'
import { OrderCancel, OrderFailure, OrderRequest } from '@/types/order/order'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from './inventory/FloatTrailDetail'

export const OrderDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [showReason, setShowReason] = useState<boolean>(false)
  const [cancelReason, setCancelReason] = useState<string>('')
  const [order, setOrder] = useState<OrderRequest>(DefaultOrder)
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<CommonListResultType<OrderRequest>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.order.getOrders,
        token: cookies.token,
        params: {
          ordersId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setOrder({
        ...DefaultRequest,
        ...data.data[0],
      })
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const approvedResult = useApiCall<OrderRequest, OrderFailure>({
    callApi: () =>
      putMethod<OrderRequest>({
        pathName: apiRoute.order.approveOrders,
        token: cookies.token,
        params: { ordersId: id || '' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
    },
  })
  const cancelResult = useApiCall<OrderCancel, OrderFailure>({
    callApi: () =>
      putMethod<OrderCancel>({
        pathName: apiRoute.order.cancelOrders,
        token: cookies.token,
        params: { ordersId: id || '', cancelReason },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
    },
  })

  useEffect(() => {
    if (!!id) {
      viewResult.setLetCall(true)
    }
  }, [id])

  const onchangeUserState = (newUpdate: Partial<UserRequest>) => {
    const newUserState = { ...order }
    setOrder({ ...newUserState, ...newUpdate })
  }
  const handleSetTypeUpdate = () => {
    setType('update')
  }
  const handleSubmit = () => {
    cancelResult.setLetCall(true)
    setShowReason(false)
  }
  const callUpdate = () => {
    approvedResult.setLetCall(true)
  }
  const handleSetTypeRead = () => {
    if (viewResult?.data?.result) setOrder({ ...DefaultRequest, ...viewResult.data.result.data[0] })
    setType('read')
    approvedResult.handleReset()
  }
  const approveLabel = useTranslation('ApproveRequest')
  const cancelRequestLabel = useTranslation('CancelRequest')

  const editLabel = useTranslation('edit')
  const breadCrumb = useGetBreadCrumb()
  const cancelLabel = useTranslation('cancel')

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  return (
    <>
      <h2>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        {breakPoint > 1 ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {type === 'read' ? (
                <>
                  <Button onClick={handleSetTypeUpdate}>{editLabel}</Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      router.push('/admin/orders/management')
                    }}
                  >
                    {cancelLabel}
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" onClick={callUpdate} disabled={approvedResult.loading}>
                    {approvedResult.loading ? <Loading /> : <>{approveLabel}</>}
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setShowReason(true)}
                    disabled={approvedResult.loading}
                  >
                    {approvedResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                  </Button>
                  <Button
                    color="warning"
                    onClick={handleSetTypeRead}
                    disabled={approvedResult.loading}
                  >
                    {cancelLabel}
                  </Button>
                  {showReason && (
                    <>
                      <div
                        style={{
                          position: 'fixed',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.9)',
                          zIndex: 2,
                          cursor: 'pointer',
                        }}
                      />
                      <div
                        style={{
                          display: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            borderRadius: '4px',
                            fontSize: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '30px',
                            maxWidth: '400px',
                            zIndex: 3,
                          }}
                        >
                          <div style={{ position: 'relative' }}>
                            <AiOutlineClose
                              style={{
                                color: '#fff',
                                position: 'absolute',
                                top: -25,
                                right: -20,
                                cursor: 'pointer',
                              }}
                              onClick={() => setShowReason(false)}
                            />

                            <h2
                              style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}
                            >
                              Please fill Reason
                            </h2>
                            <div
                              style={{
                                position: 'relative',
                                margin: '20px 0 40px',
                                width: '300px',
                              }}
                            >
                              <label
                                style={{
                                  color: '#fff',
                                  top: '15px',
                                  left: '0',
                                  pointerEvents: 'none',
                                }}
                              >
                                Reason for cancel request
                              </label>
                              <input
                                required
                                value={cancelReason}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  setCancelReason(event.currentTarget.value)
                                }
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '0',
                                  borderBottom: '2px #fff solid',
                                  display: 'block',
                                  padding: '15px 0',
                                  fontSize: '18px',
                                  color: '#fff',
                                  width: '100%',
                                }}
                                type="text"
                              />
                            </div>
                          </div>

                          <Button
                            style={{
                              cursor: 'pointer',
                              display: 'inline-block',
                              width: '100%',
                              background: 'rgb(178, 40, 48)',
                              fontSize: '16px',
                              border: '0',
                              borderRadius: '5px',
                              color: '#fff',
                            }}
                            onClick={handleSubmit}
                          >
                            {approvedResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <FloatTrayDetail
              type={type}
              handleSetTypeUpdate={handleSetTypeUpdate}
              callCancel={() => setShowReason(true)}
              callUpdate={callUpdate}
              handleSetTypeRead={handleSetTypeRead}
            />
            {showReason && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
                <div
                  style={{
                    display: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      fontSize: '90%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '30px',
                      maxWidth: '400px',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <AiOutlineClose
                        style={{
                          color: '#fff',
                          position: 'absolute',
                          top: -25,
                          right: -20,
                          cursor: 'pointer',
                        }}
                        onClick={() => setShowReason(false)}
                      />

                      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>
                        Please fill Reason
                      </h2>
                      <div
                        style={{
                          position: 'relative',
                          margin: '20px 0 40px',
                          width: '300px',
                        }}
                      >
                        <label
                          style={{
                            color: '#fff',
                            top: '15px',
                            left: '0',
                            pointerEvents: 'none',
                          }}
                        >
                          Reason for cancel request
                        </label>
                        <input
                          required
                          value={cancelReason}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setCancelReason(event.currentTarget.value)
                          }
                          style={{
                            backgroundColor: 'transparent',
                            border: '0',
                            borderBottom: '2px #fff solid',
                            display: 'block',
                            padding: '15px 0',
                            fontSize: '18px',
                            color: '#fff',
                            width: '100%',
                          }}
                          type="text"
                        />
                      </div>
                    </div>

                    <Button
                      style={{
                        cursor: 'pointer',
                        display: 'inline-block',
                        width: '100%',
                        background: 'rgb(178, 40, 48)',
                        fontSize: '16px',
                        border: '0',
                        borderRadius: '5px',
                        color: '#fff',
                      }}
                      onClick={handleSubmit}
                    >
                      {approvedResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div style={{ paddingTop: 20 }}>
        <OrderForm
          order={order}
          onchangeUserState={onchangeUserState}
          type="read"
          errorState={approvedResult.error?.result}
        />
      </div>
    </>
  )
}
