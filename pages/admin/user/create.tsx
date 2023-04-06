import { useRoleSwitch } from '@/hooks'
import { UserCreate } from '@/modules/user/UserCreate'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const UserCreatePage: NextPageWithLayout = () => {
  return useRoleSwitch(<UserCreate />)
}

UserCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserCreatePage
