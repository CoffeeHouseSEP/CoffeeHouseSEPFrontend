import { InternalLayout } from '@/components/layout/InternalLayout'
import { Settings } from '@/modules/settings'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const SettingPage: NextPageWithLayout = () => {
  return <Settings />
}

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <InternalLayout>{page}</InternalLayout>
}

export default SettingPage
