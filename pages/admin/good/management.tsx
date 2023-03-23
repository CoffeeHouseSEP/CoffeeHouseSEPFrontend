import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const GoodManagement: NextPageWithLayout = () => {
  return <>good dashboard</>
}

GoodManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodManagement
