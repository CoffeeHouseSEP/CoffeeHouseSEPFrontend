import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const UserManagement: NextPageWithLayout = () => {
  return <>user dashboard</>
}

UserManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default UserManagement
