import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultRequest } from '@/inventory'
import { RequestBranchForm } from '@/inventory/RequestBranchForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType, UserRequest } from '@/types'
import { RequestBranchRequest, RequestCancel, RequestFailure } from '@/types/request/request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from './inventory/FloatTrailDetail'

export const RequestBranchDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [showReason, setShowReason] = useState<boolean>(false)
  const [cancelReason, setCancelReason] = useState<string>('')
  const [request, setRequest] = useState<RequestBranchRequest>(DefaultRequest)
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<CommonListResultType<RequestBranchRequest>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.request.getRequest,
        token: cookies.token,
        params: {
          requestId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setRequest({
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
  const updateResult = useApiCall<RequestBranchRequest, RequestFailure>({
    callApi: () =>
      putMethod<RequestBranchRequest>({
        pathName: apiRoute.request.updateRequest,
        token: cookies.token,
        params: { requestId: request.requestId },
        request,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
      setType('read')
    },
  })

  const completedResult = useApiCall<RequestBranchRequest, RequestFailure>({
    callApi: () =>
      putMethod<RequestBranchRequest>({
        pathName: apiRoute.request.completeRequest,
        token: cookies.token,
        params: { requestId: id || '' },
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
  const sendRequest = useApiCall<RequestBranchRequest, RequestFailure>({
    callApi: () =>
      putMethod<RequestBranchRequest>({
        pathName: apiRoute.request.sendRequest,
        token: cookies.token,
        params: { requestId: id || '' },
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
  const cancelResult = useApiCall<RequestCancel, RequestFailure>({
    callApi: () =>
      putMethod<RequestCancel>({
        pathName: apiRoute.request.cancelRequest,
        token: cookies.token,
        params: { requestId: id || '', cancelReason },
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
    const newUserState = { ...request }
    setRequest({ ...newUserState, ...newUpdate })
  }
  const handleSetTypeUpdate = () => {
    setType('update')
  }
  const handleSubmit = () => {
    cancelResult.setLetCall(true)
    setShowReason(false)
  }
  const callUpdateRequest = () => {
    updateResult.setLetCall(true)
  }
  const callSendRequest = () => {
    sendRequest.setLetCall(true)
  }
  const callUpdate = () => {
    completedResult.setLetCall(true)
  }
  const handleSetTypeRead = () => {
    if (viewResult?.data?.result)
      setRequest({ ...DefaultRequest, ...viewResult.data.result.data[0] })
    setType('read')
    updateResult.handleReset()
  }
  const completeLabel = useTranslation('CompleteRequest')
  const cancelRequestLabel = useTranslation('CancelRequest')
  const saveLabel = useTranslation('Save')
  const editLabel = useTranslation('edit')
  const breadCrumb = useGetBreadCrumb()
  const cancelLabel = useTranslation('cancel')
  const sendLabel = useTranslation('SendRequest')

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
                  <Button onClick={() => setType('update')}>{editLabel}</Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      router.push('/admin/request-branch/management')
                    }}
                  >
                    {cancelLabel}
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" onClick={callUpdate} disabled={completedResult.loading}>
                    {viewResult.loading ? <Loading /> : <>{completeLabel}</>}
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setShowReason(true)}
                    disabled={completedResult.loading}
                  >
                    {viewResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                  </Button>
                  <Button
                    color="primary"
                    onClick={callUpdateRequest}
                    disabled={updateResult.loading}
                  >
                    {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                  </Button>
                  <Button color="warning" onClick={handleSetTypeRead} disabled={viewResult.loading}>
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
                            {viewResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
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
                      {viewResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div style={{ paddingTop: 20 }}>
        <RequestBranchForm
          request={request}
          onchangeUserState={onchangeUserState}
          type={type}
          errorState={updateResult.error?.result}
        />
      </div>
      <div style={{ float: 'right' }}>
        <Button color="primary" onClick={callSendRequest} disabled={viewResult.loading}>
          {viewResult.loading ? <Loading /> : <>{sendLabel}</>}
        </Button>
      </div>
    </>
  )
}
