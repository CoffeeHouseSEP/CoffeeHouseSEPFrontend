import { MyOrderDetail } from '@/modules/orders/MyOrderDetail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const OrdersDetail: NextPageWithLayout = () => {
  return <MyOrderDetail />
}

OrdersDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default OrdersDetail
