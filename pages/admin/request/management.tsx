import { useRoleSwitch } from '@/hooks'
import { RequestManagement } from '@/modules/request/management/Requestmanagement'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const RequestsManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<RequestManagement />)
}

RequestsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default RequestsManagement
