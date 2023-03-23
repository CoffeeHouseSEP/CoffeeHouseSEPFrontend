import { InternalLayout } from '@/components/layout/InternalLayout'
import { CateManagement } from '@/modules/category'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const CategoryManagement: NextPageWithLayout = () => {
  return <CateManagement />
}

CategoryManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryManagement
