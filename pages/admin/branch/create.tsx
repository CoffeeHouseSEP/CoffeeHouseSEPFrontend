import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import BranchCreate from '@/modules/branch/create/CreateBranch'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchCreate />)
}

BranchsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsCreate
