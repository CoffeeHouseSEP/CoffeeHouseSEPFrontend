import { Modal } from '@/components'
import { RegisterFrom } from '@/modules/register'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const EndUserLayout = dynamic(() => import('@/components/layout/EndUserLayout'), { ssr: false })
const RegisterPage: NextPageWithLayout = () => {
  return (
    <Modal open notBlur>
      <RegisterFrom />
    </Modal>
  )
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <EndUserLayout>
      <Image src="/login-background.jpg" layout="fill" />
      {page}
    </EndUserLayout>
  )
}

export default RegisterPage
