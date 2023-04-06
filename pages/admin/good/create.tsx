import { useRoleSwitch } from '@/hooks'
import GoodCreate from '@/modules/goods/create/GoodCreate'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const GoodsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<GoodCreate />)
}

GoodsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsCreate
