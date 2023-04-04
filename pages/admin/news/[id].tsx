import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import { DetailNews } from '@/modules/news/detail'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const NewDetail: NextPageWithLayout = () => {
  return useRoleSwitch(<DetailNews />)
}

NewDetail.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewDetail
