import { useRoleSwitch } from '@/hooks'
import { CouponManage } from '@/modules/coupon/CouponManage'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CouponManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<CouponManage />)
}

CouponManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CouponManagement
