import { OrderManagement } from '@/modules/orders/OrderManagement'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const OrdersManagement: NextPageWithLayout = () => {
  return <OrderManagement />
}

OrdersManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default OrdersManagement
