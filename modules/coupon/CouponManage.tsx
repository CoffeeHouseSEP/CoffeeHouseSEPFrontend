import { Button, CustomTable, Pagination } from '@/components'
import { FloatButton } from '@/components/button/FloatButton'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { VND } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { CouponResponse } from '@/types/coupon'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosCreate } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const CouponManage = () => {
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const result = useApiCall<CommonListResultType<CouponResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.coupon.getList,
        token: cookies.token,
        params: { page: String(page) },
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
      key: 'code',
      label: 'couponCode',
    },
    {
      key: 'expiredDate',
      label: 'expiredDateCoupon',
    },
    {
      key: 'appliedDate',
      label: 'appliedDateCoupon',
    },
    {
      key: 'maxValuePromotion',
      label: 'maxValuePromotion',
    },
    {
      key: 'value',
      label: 'percentCoupon',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  const handleRedirectCreate = () => {
    router.push('/admin/coupon/create')
  }

  return (
    <>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>Quản lý mã giảm giá</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>Quản lý mã giảm giá</h2>
        {breakPoint > 1 ? (
          <Button onClick={handleRedirectCreate}>Tạo mã giảm giá</Button>
        ) : (
          <FloatButton
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              aspectRatio: '1 / 1',
            }}
            onClick={handleRedirectCreate}
          >
            <IoIosCreate style={{ width: '50%', height: '50%' }} />
          </FloatButton>
        )}
      </div>
      <CustomTable
        idFiled="couponId"
        detailPath="admin/coupon/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((cate) => {
                return {
                  ...cate,
                  status: cate.status === 1 ? 'Đang hoạt động' : 'Không hoạt động',
                  maxValuePromotion: VND.format(cate.maxValuePromotion),
                  value: `${cate.value} %`,
                }
              })
            : []
        }
        loading={loading}
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
    </>
  )
}
