import { EndUserLayout } from '@/components'
import { MyOrderDetail } from '@/modules/orders/MyOrderDetail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const MyOrderDetailPage: NextPageWithLayout = () => {
  return <MyOrderDetail />
}

MyOrderDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default MyOrderDetailPage
