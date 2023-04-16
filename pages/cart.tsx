import { EndUserLayout } from '@/components'
import { CartContainer } from '@/modules/cart'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const CartPage: NextPageWithLayout = () => {
  return <CartContainer />
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <EndUserLayout>{page}</EndUserLayout>
}

export default CartPage
