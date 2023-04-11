import { RequestBranchDetail } from '@/modules/request-branch/RequestBranchDetail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const RequestsBranchDetail: NextPageWithLayout = () => {
  return <RequestBranchDetail />
}

RequestsBranchDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default RequestsBranchDetail
