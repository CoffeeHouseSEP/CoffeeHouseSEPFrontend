import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import { BranchDetail } from '@/modules/branch/detail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<BranchDetail />)
}

BranchsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsDetail
