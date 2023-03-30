import { EndUserLayout, Modal } from '@/components'
import { LoginForm } from '@/modules/sign-in'
import Image from 'next/image'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const LoginPage: NextPageWithLayout = () => {
  return (
    <Modal open notBlur>
      <LoginForm isEndUser />
    </Modal>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <EndUserLayout>
      <Image src="/login-background.jpg" layout="fill" />
      {page}
    </EndUserLayout>
  )
}

export default LoginPage
