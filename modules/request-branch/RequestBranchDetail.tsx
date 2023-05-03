import { Button, CustomTable, Loading, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { ROLE_COOKIE, TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultRequest } from '@/inventory'
import { RequestBranchForm } from '@/inventory/RequestBranchForm'
import { VND } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import {
  RequestBranchRequest,
  RequestCancel,
  RequestFailure,
  RequestUpdateBranchRequest,
} from '@/types/request/request'
import { RequestCreateResponse, RequestDetailResponse } from '@/types/requestDetail/requestDetail'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from './inventory/FloatTrailDetail'

export const RequestBranchDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, ROLE_COOKIE])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [showReason, setShowReason] = useState<boolean>(false)
  const [cancelReason, setCancelReason] = useState<string>('')
  const [request, setRequest] = useState<RequestBranchRequest>(DefaultRequest)
  const [requestDetail, setRequestDetail] = useState<RequestCreateResponse[]>([])
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)
  const [page, setPage] = useState<number>(1)

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
  const result = useApiCall<CommonListResultType<RequestDetailResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.request.requestDetailRequest,
        token: cookies.token,
        params: { requestId: id || '' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  useEffect(() => {
    if (result.data) {
      const listDetail: RequestCreateResponse[] = result.data?.result.data.map((item) => {
        return {
          goodsId: item.goodsId,
          quantity: item.quantity,
          applyPrice: item.applyPrice,
        }
      })
      setRequestDetail(listDetail)
    }
  }, [result.data])

  const onChangeReq = (value: Partial<RequestBranchRequest>) => {
    setRequest({ ...request, ...value })
  }

  const updateResult = useApiCall<RequestUpdateBranchRequest, RequestFailure>({
    callApi: () =>
      putMethod<RequestUpdateBranchRequest>({
        pathName: apiRoute.request.updateRequest,
        token: cookies.token,
        params: { requestId: request.requestId },
        request: { requestId: id || '', listRequestDetail: requestDetail },
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
      result.setLetCall(true)
      viewResult.setLetCall(true)
    }
  }, [id])

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
  const callUpdate = () => {
    completedResult.setLetCall(true)
  }
  const handleSetTypeRead = () => {
    if (viewResult?.data?.result) {
      setRequest({ ...DefaultRequest, ...viewResult.data.result.data[0] })
      setRequestDetail(result.data?.result.data || [])
    }
    setType('read')
    updateResult.handleReset()
  }

  const dataField: ViewPointType[] = [
    {
      key: 'goodsName',
      label: 'goodsName',
    },
    {
      key: 'quantity',
      label: 'quantity',
    },
    {
      key: 'applyPrice',
      label: 'innerPrice',
    },
  ]

  const completeLabel = useTranslation('CompleteRequest')
  const cancelRequestLabel = useTranslation('CancelRequest')
  const saveLabel = useTranslation('Save')
  const editLabel = useTranslation('edit')
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 40,
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
                  {cookies.role === 'ADMIN' && (
                    <>
                      <Button
                        color="primary"
                        onClick={callUpdate}
                        disabled={completedResult.loading}
                      >
                        {viewResult.loading ? <Loading /> : <>{completeLabel}</>}
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => setShowReason(true)}
                        disabled={completedResult.loading}
                      >
                        {viewResult.loading ? <Loading /> : <>{cancelRequestLabel}</>}
                      </Button>
                    </>
                  )}
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
                              Hãy điền lý do
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
                                Lý do hủy kích hoạt
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
                        Hãy điền lý do
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
                          Lý do hủy yêu cầu
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
          requestBody={requestDetail}
          onchangeUserState={onChangeReq}
          onchangeListState={setRequestDetail}
          type={type}
          type1={type}
          errorState={updateResult.error?.result}
        />
      </div>

      {type === 'read' && (
        <div>
          <div style={{ fontSize: '25px', fontWeight: 'bold', padding: 20 }}>
            Những sản phẩm đã chọn:
          </div>
          <CustomTable
            listActions={[]}
            idFiled="requestId"
            detailPath="admin/request-branch/"
            header={dataField ?? []}
            body={
              result.data?.result.data
                ? result.data?.result.data.map((item) => {
                    return { ...item, applyPrice: VND.format(item.applyPrice) }
                  })
                : []
            }
          >
            <>{null}</>
          </CustomTable>
          {!result.loading && (
            <Pagination
              total={result.data?.result?.totalRows ?? 0}
              onChange={(number) => setPage(number)}
              page={page}
              paginationStyle={{ marginTop: 20 }}
            />
          )}
        </div>
      )}
    </>
  )
}
