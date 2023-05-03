import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { CouponForm } from '@/inventory/CouponForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { CategoryRequest } from '@/types/category/category'
import { CouponRequest, CouponRequestFailure } from '@/types/coupon'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from '../category/inventory'

export const CouponCreate = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const [couponState, setCouponState] = useState<CouponRequest>({
    code: '',
    value: 0,
    status: 0,
    createdDate: new Date(),
    expiredDate: new Date(),
    appliedDate: new Date(),
    maxValuePromotion: 0,
  })

  const createResult = useApiCall<CouponRequest, CouponRequestFailure>({
    callApi: () =>
      postMethod<CouponRequest>({
        pathName: apiRoute.coupon.addNew,
        token: cookies.token,
        request: couponState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/coupon/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<CategoryRequest>) => {
    const newUserState = { ...couponState }
    setCouponState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/coupon/management')
  }
  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Tạo mã giảm giá</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Tạo mã giảm giá</h2>
        {breakPoint > 1 ? (
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <Button color="primary" onClick={callCreate} disabled={createResult.loading}>
              {createResult.loading ? <Loading /> : <>{saveLabel}</>}
            </Button>
            <Button color="warning" onClick={directManagement} disabled={createResult.loading}>
              {cancelLabel}
            </Button>
          </div>
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )}
      </div>
      <div style={{ paddingTop: 40 }}>
        <CouponForm
          type="update"
          category={couponState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
