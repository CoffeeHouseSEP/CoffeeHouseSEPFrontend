import { EndUserLayout, Modal } from '@/components'
import { RegisterFrom } from '@/modules/register'
import Image from 'next/image'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

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
      <Image src="/asset/slider3.jpeg" layout="fill" />
      {page}
    </EndUserLayout>
  )
}

export default RegisterPage
