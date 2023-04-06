import { useRoleSwitch } from '@/hooks'
import CategoryCreate from '@/modules/category/create/CategoryCreate'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CategoryDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<CategoryCreate />)
}

CategoryDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryDetail
