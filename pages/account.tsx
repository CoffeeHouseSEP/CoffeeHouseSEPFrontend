import { EndUserLayout } from '@/components'
import { Account } from '@/modules/account'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const AccountPage: NextPageWithLayout = () => {
  return <Account />
}

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default AccountPage
