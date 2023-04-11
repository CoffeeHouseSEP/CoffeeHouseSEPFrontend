import { RequestBranchManagement } from '@/modules/request-branch/RequestBranchManagement'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const RequestsBranchManagement: NextPageWithLayout = () => {
  return <RequestBranchManagement />
}

RequestsBranchManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default RequestsBranchManagement
