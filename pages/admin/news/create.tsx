import { InternalLayout } from '@/components/layout/InternalLayout'
import { useRoleSwitch } from '@/hooks'
import NewCreate from '@/modules/news/create/CreateNew'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../../_app'

const NewsCreate: NextPageWithLayout = () => {
  return useRoleSwitch(<NewCreate />)
}

NewsCreate.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default NewsCreate
