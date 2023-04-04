import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import { UserCreate } from '@/modules/user/UserCreate'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const UserCreatePage: NextPageWithLayout = () => {
  return useRoleSwitch(<UserCreate />)
}

UserCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserCreatePage
