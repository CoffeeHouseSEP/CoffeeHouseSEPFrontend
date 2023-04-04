import { useRoleSwitch } from '@/hooks'
import { BranchDetail } from '@/modules/branch/detail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const BranchsDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchDetail />)
}

BranchsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsDetail
