import { EndUserLayout } from '@/components'
import GoodsDetail from '@/modules/goods/detail/GoodsDetail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return <GoodsDetail />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
