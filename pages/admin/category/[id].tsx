import { InternalLayout } from '@/components/layout/InternalLayout'
import { CateDetail } from '@/modules/category/detail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const CategoryDetail: NextPageWithLayout = () => {
  return <CateDetail />
}

CategoryDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryDetail
