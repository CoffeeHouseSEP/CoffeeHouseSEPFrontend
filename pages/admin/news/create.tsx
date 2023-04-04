import { useRoleSwitch } from '@/hooks'
import NewCreate from '@/modules/news/create/CreateNew'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const NewsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<NewCreate />)
}

NewsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewsCreate
