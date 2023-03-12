import { EndUserLayout } from '@/components'
import CategoryDes from '@/modules/category/category-description/CategoryDes'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return <CategoryDes />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
