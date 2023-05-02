import { MyOrderContainer } from '@/modules/orders/MyOrderContainer'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })
const MyOrderPage: NextPageWithLayout = () => {
  return <MyOrderContainer />
}

MyOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default MyOrderPage
