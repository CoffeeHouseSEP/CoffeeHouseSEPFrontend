import { EndUserLayout } from '@/components'
import AboutUs from '@/modules/about-us/AboutUs'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return <AboutUs />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
