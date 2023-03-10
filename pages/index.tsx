import { EndUserLayout } from '@/components'
import { HomeContainer } from '@/modules'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return <HomeContainer />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
