import { InternalLayout } from '@/components/layout/InternalLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const LoginPage: NextPageWithLayout = () => {
  return <>login</>
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default LoginPage
