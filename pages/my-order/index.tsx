import { EndUserLayout } from '@/components'
import { MyOrderContainer } from '@/modules/orders/MyOrderContainer'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const MyOrderPage: NextPageWithLayout = () => {
  return <MyOrderContainer />
}

MyOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default MyOrderPage
