import { EndUserLayout } from '@/components'
import ListNews from '@/modules/news/list-news/ListNews'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return <ListNews />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
