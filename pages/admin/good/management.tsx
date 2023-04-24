import { GoodManagement } from '@/modules/goods/management'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const InternalLayout = dynamic(() => import('@/components/layout/InternalLayout'), { ssr: false })

const GoodsManagement: NextPageWithLayout = () => {
  return <GoodManagement />
}

GoodsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsManagement
