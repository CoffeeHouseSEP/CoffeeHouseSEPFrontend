import { InternalLayout } from '@/components/layout/InternalLayout'
import { NewManagement } from '@/modules/news/management'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const NewsManagement: NextPageWithLayout = () => {
  return <NewManagement />
}

NewsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewsManagement
