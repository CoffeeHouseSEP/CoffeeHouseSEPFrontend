import { useRoleSwitch } from '@/hooks'
import { CouponCreate } from '@/modules/coupon/CouponCreate'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CreateCouponPage: NextPageWithLayout = () => {
  return useRoleSwitch(<CouponCreate />)
}

CreateCouponPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CreateCouponPage
