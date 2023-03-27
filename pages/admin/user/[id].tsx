import { InternalLayout } from '@/components/layout/InternalLayout'
import { UserDetail } from '@/modules/user/UserDetail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const UserDetailPage: NextPageWithLayout = () => {
  return <UserDetail />
}

UserDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserDetailPage
