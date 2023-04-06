import { useRoleSwitch } from '@/hooks'
import { BranchManagement } from '@/modules/branch/management'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const BranchsManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchManagement />)
}

BranchsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsManagement
