import { useRoleSwitch } from '@/hooks'
import { UserDetail } from '@/modules/user/UserDetail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const UserDetailPage: NextPageWithLayout = () => {
  return useRoleSwitch(<UserDetail />)
}

UserDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserDetailPage
