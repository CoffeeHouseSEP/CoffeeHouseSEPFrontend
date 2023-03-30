import { InternalLayout } from '@/components/layout/InternalLayout'
import { GoodManagement } from '@/modules/goods/management'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const GoodsManagement: NextPageWithLayout = () => {
  return <GoodManagement />
}

GoodsManagement.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsManagement
