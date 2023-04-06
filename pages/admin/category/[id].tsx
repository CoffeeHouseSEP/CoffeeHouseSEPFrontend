import { useRoleSwitch } from '@/hooks'
import { CateDetail } from '@/modules/category/detail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const CategoryDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<CateDetail />)
}

CategoryDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default CategoryDetail
