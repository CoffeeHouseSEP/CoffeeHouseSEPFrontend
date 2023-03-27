import { InternalLayout } from '@/components/layout/InternalLayout'
import { UserCreate } from '@/modules/user/UserCreate'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const UserCreatePage: NextPageWithLayout = () => {
  return <UserCreate />
}

UserCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserCreatePage
