import RequestCreate from '@/modules/request/create/RequestCreate'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const RequestsCreateDetail: NextPageWithLayout = () => {
  return <RequestCreate />
}

RequestsCreateDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default RequestsCreateDetail
