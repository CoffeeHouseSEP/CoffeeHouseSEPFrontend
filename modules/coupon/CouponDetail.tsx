import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { CouponForm } from '@/inventory/CouponForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { CouponRequest, CouponRequestFailure, CouponResponse } from '@/types/coupon'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from '../category/inventory'

export const CouponDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [categoryState, setCategoryState] = useState<CouponRequest>({
    code: '',
    value: 0,
    status: 0,
    createdDate: new Date(),
    expiredDate: new Date(),
    appliedDate: new Date(),
    maxValuePromotion: 0,
  })
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<CommonListResultType<CouponResponse>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.coupon.getList,
        token: cookies.token,
        params: {
          couponId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setCategoryState({
        code: data.data[0].code,
        value: data.data[0].value,
        status: data.data[0].status ? 1 : 0,
        createdDate: new Date(data.data[0].createdDate.split('-').reverse().join('-')),
        expiredDate: new Date(data.data[0].expiredDate.split('-').reverse().join('-')),
        appliedDate: new Date(data.data[0].appliedDate.split('-').reverse().join('-')),
        maxValuePromotion: data.data[0].maxValuePromotion,
      })
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<CouponRequest, CouponRequestFailure>({
    callApi: () =>
      putMethod({
        pathName: apiRoute.coupon.updateCoupon,
        token: cookies.token,
        request: {
          ...categoryState,
          couponId: id,
        },
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

  useEffect(() => {
    if (!!id) {
      viewResult.setLetCall(true)
    }
  }, [id])

  const onchangeUserState = (newUpdate: Partial<CouponRequest>) => {
    const newUserState = { ...categoryState }
    setCategoryState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')
  const saveLabel = useTranslation('saveLabel')
  const editLabel = useTranslation('edit')

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  const handleSetTypeUpdate = () => {
    setType('update')
  }

  const callUpdate = () => {
    updateResult.setLetCall(true)
  }

  const handleSetTypeRead = () => {
    if (viewResult?.data?.result)
      setCategoryState({
        code: viewResult?.data?.result.data[0].code,
        value: viewResult?.data?.result.data[0].value,
        status: viewResult?.data?.result.data[0].status ? 1 : 0,
        createdDate: new Date(
          viewResult?.data?.result.data[0].createdDate.split('-').reverse().join('-')
        ),
        expiredDate: new Date(
          viewResult?.data?.result.data[0].expiredDate.split('-').reverse().join('-')
        ),
        appliedDate: new Date(
          viewResult?.data?.result.data[0].appliedDate.split('-').reverse().join('-')
        ),
        maxValuePromotion: viewResult?.data?.result.data[0].maxValuePromotion,
      })
    setType('read')
    updateResult.handleReset()
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2>Thông tin mã giảm giá: {viewResult.data?.result.data[0].code}</h2>
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
                      router.push('/admin/coupon/management')
                    }}
                  >
                    {cancelLabel}
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" onClick={callUpdate} disabled={updateResult.loading}>
                    {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                  </Button>
                  <Button
                    color="warning"
                    onClick={handleSetTypeRead}
                    disabled={updateResult.loading}
                  >
                    {cancelLabel}
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <FloatTrayDetail
            type={type}
            handleSetTypeUpdate={handleSetTypeUpdate}
            callUpdate={callUpdate}
            handleSetTypeRead={handleSetTypeRead}
          />
        )}
      </div>
      <div style={{ paddingTop: 20 }}>
        <CouponForm
          type={type}
          category={categoryState}
          onchangeUserState={onchangeUserState}
          errorState={updateResult.error?.result}
        />
      </div>
    </div>
  )
}
