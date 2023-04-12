import { useRoleSwitch } from '@/hooks'
import { NewManagement } from '@/modules/news/management'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const NewsManagement: NextPageWithLayout = () => {
  return useRoleSwitch(<NewManagement />)
}

NewsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewsManagement
