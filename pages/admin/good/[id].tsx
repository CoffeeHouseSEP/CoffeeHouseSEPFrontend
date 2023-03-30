import { InternalLayout } from '@/components/layout/InternalLayout'
import { GoodDetail } from '@/modules/goods/detail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const GoodsDetail: NextPageWithLayout = () => {
  return <GoodDetail />
}

GoodsDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsDetail
