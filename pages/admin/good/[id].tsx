import { useRoleSwitch } from '@/hooks'
import { GoodDetail } from '@/modules/goods/detail'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const GoodsDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<GoodDetail />)
}

GoodsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsDetail
