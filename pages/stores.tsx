import { EndUserLayout } from '@/components'
import StoresInfo from '@/modules/stores/stores'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const StoresPage: NextPageWithLayout = () => {
  return <StoresInfo />
}

StoresPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default StoresPage
