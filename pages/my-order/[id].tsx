import { MyOrderDetail } from '@/modules/orders/MyOrderDetail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })
const MyOrderDetailPage: NextPageWithLayout = () => {
  return <MyOrderDetail />
}

MyOrderDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default MyOrderDetailPage
