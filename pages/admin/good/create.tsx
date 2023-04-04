import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import GoodCreate from '@/modules/goods/create/GoodCreate'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const GoodsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<GoodCreate />)
}

GoodsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default GoodsCreate
