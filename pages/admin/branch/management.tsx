import { InternalLayout } from '@/components/layout/InternalLayout'
import { BranchManagement } from '@/modules/branch/management'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsManagement: NextPageWithLayout = () => {
  return <BranchManagement />
}

BranchsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsManagement
