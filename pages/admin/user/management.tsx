import { UserManagement } from '@/modules/user/UserManagement'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const UserManagementPage: NextPageWithLayout = () => {
  return <UserManagement />
}

UserManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserManagementPage
