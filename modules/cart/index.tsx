import { useResponsive } from '@/hooks'
import { OrderRequest } from '@/types/order/order'
import { useEffect, useState } from 'react'
import { CartGeneralInfo } from './CartGeneralInfo'
import { ProductCart, itemStyle } from './ProductCart'

export const CartContainer = () => {
  const [cart, setCart] = useState<{ id: string; qty: number; size: 'M' | 'S' | 'L' }[]>([])
  const [reloadCart, setReloadCart] = useState<boolean>(true)
  const [order, setOrder] = useState<OrderRequest>({
    branchId: '',
    address: '',
    province: '',
    ward: '',
    district: '',
    couponId: '',
    listOrderDetail: [],
  })

  const pixel = useResponsive()

  useEffect(() => {
    if (reloadCart && typeof window !== 'undefined') {
      const cartLocal = localStorage.getItem('cart')
      if (cartLocal) {
        const list: { id: string; qty: number; size: 'M' | 'S' | 'L' }[] = JSON.parse(cartLocal)
        setCart(list)
      } else {
        setCart([])
      }
      setReloadCart(false)
    }
  }, [reloadCart])

  const onChangeOrder = (value: Partial<OrderRequest>) => {
    setOrder({ ...order, ...value })
  }

  useEffect(() => {
    const listInfo = cart.map((item) => {
      return {
        goodsId: item.id,
        quantity: item.qty,
        size: item.size,
      }
    })
    onChangeOrder({ listOrderDetail: listInfo })
  }, [cart, reloadCart])

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: `repeat(${pixel >= 1000 ? '2' : '1'}, minmax(0, 1fr))`,
        gap: 20,
        maxWidth: 1024,
        margin: pixel >= 1000 ? 'auto' : '10px 20px',
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
        <h3>Sản phẩm</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            gap: 10,
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              gridColumn: 'span 1 / span 1',
              marginBottom: 10,
              ...itemStyle,
            }}
          />
          <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>Qty</div>
          <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>Ảnh</div>
          <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10, ...itemStyle }}>Size</div>
          <div
            style={{
              overflow: 'hidden',
              maxWidth: '150px',
              gridColumn: 'span 2 / span 2',
              marginBottom: 10,
              ...itemStyle,
            }}
          >
            Tên sản phẩm
          </div>
          <div style={{ gridColumn: 'span 2 / span 2', marginBottom: 10, ...itemStyle }}>
            Đơn gía
          </div>

          {cart.map((item) => (
            <ProductCart setReloadCart={setReloadCart} item={item} />
          ))}
        </div>
      </div>
      <div style={{ gridColumn: 'span 1 / span 1', marginBottom: 10 }}>
        <CartGeneralInfo order={order} onChangeOrder={onChangeOrder} item={cart} />
      </div>
    </div>
  )
}
