import { EndUserLayout } from '@/components'
import DetailNew from '@/modules/news/detail/DetailNew'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return <DetailNew />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
