import { Modal } from '@/components'
import { LoginForm } from '@/modules/sign-in'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })

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
      <Image src="/asset/slider3.jpeg" layout="fill" />
      {page}
    </EndUserLayout>
  )
}

export default LoginPage
