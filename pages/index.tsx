import { HomeContainer } from '@/modules'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })
const HomePage: NextPageWithLayout = () => {
  return <HomeContainer />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
