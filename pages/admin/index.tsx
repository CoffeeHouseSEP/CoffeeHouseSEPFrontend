import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const AdminDashboard: NextPageWithLayout = () => {
  return <>admin dashboard</>
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default AdminDashboard
