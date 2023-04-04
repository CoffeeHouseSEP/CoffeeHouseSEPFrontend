import { useRoleSwitch } from '@/hooks'
import { DetailNews } from '@/modules/news/detail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const NewDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<DetailNews />)
}

NewDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewDetail
