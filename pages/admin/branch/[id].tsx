import { InternalLayout } from '@/components/layout/InternalLayout'
import { BranchDetail } from '@/modules/branch/detail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const BranchsDetail: NextPageWithLayout = () => {
  return <BranchDetail />
}

BranchsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default BranchsDetail
