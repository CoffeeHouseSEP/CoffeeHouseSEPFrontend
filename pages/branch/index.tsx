import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const BranchDashboard: NextPageWithLayout = () => {
  return <>branch dashboard</>
}

BranchDashboard.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchDashboard
