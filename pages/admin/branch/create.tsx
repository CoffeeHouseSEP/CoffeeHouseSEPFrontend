import { InternalLayout } from '@/components/layout/InternalLayout'
import BranchCreate from '@/modules/branch/create/CreateBranch'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsCreate: NextPageWithLayout = () => {
  return <BranchCreate />
}

BranchsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsCreate
