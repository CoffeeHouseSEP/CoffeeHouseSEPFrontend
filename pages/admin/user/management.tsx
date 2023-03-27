import { InternalLayout } from '@/components/layout/InternalLayout'
import { UserManagement } from '@/modules/user/UserManagement'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const UserManagementPage: NextPageWithLayout = () => {
  return <UserManagement />
}

UserManagementPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserManagementPage
