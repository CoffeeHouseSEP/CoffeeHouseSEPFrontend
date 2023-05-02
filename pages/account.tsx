import { Account } from '@/modules/account'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })
const AccountPage: NextPageWithLayout = () => {
  return <Account />
}

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default AccountPage
