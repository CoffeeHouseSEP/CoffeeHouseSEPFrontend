import { DashboardContainer } from '@/modules/dashboard'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const AdminDashboard: NextPageWithLayout = () => {
  return <DashboardContainer />
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default AdminDashboard
