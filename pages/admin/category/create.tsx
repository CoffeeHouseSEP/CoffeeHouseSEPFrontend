import { InternalLayout } from '@/components/layout/InternalLayout'
import CategoryCreate from '@/modules/category/create/CategoryCreate'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const CategoryDetail: NextPageWithLayout = () => {
  return <CategoryCreate />
}

CategoryDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryDetail