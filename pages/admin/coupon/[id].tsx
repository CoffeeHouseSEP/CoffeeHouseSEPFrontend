import { useRoleSwitch } from '@/hooks'
import { CouponDetail } from '@/modules/coupon/CouponDetail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CouponDetailPage: NextPageWithLayout = () => {
  return useRoleSwitch(<CouponDetail />)
}

CouponDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CouponDetailPage
