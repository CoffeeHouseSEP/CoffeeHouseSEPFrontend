import { useRoleSwitch } from '@/hooks'
import { RequestDetail } from '@/modules/request/detail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const RequetsDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<RequestDetail />)
}

RequetsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default RequetsDetail
