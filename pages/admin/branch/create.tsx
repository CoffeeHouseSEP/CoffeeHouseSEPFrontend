import { useRoleSwitch } from '@/hooks'
import BranchCreate from '@/modules/branch/create/CreateBranch'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const BranchsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchCreate />)
}

BranchsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsCreate
