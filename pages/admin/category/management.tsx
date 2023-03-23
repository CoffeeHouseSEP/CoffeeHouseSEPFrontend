import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const CategoryManagement: NextPageWithLayout = () => {
  return <>category dashboard</>
}

CategoryManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryManagement
