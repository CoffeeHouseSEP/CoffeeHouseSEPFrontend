import { EndUserLayout } from '@/components'
import { LoginForm } from '@/modules/sign-in'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return <LoginForm />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default HomePage
