import { useRoleSwitch } from '@/hooks'
import { CateManagement } from '@/modules/category'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CategoryManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<CateManagement />)
}

CategoryManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryManagement
