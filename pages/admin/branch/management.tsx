import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import { BranchManagement } from '@/modules/branch/management'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchManagement />)
}

BranchsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsManagement
