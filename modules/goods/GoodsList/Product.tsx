import { addToCartHandler, themeValue } from '@/lib'
import ImageItem from '@/modules/news/Image/ImageItem'
import { setReloadCrt } from '@/redux/share-store'
import { GoodsRequest } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface PropProduct {
  items: GoodsRequest[]
}
const Product = ({ items }: PropProduct) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState<string>()
  const handleMouseEnter = (id: string) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }

  const dispatch = useDispatch()

  return (
    <div
      style={{
        width: '100vw',
        margin: '0 auto',
        maxWidth: '1170px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr)',
        gap: '2rem 1rem',
        justifyItems: 'center',
      }}
    >
      {items &&
        items.map((menuItem) => {
          const { name, applyPrice } = menuItem
          return (
            <article key={menuItem.goodsId} style={{ display: 'grid', maxWidth: '25rem' }}>
              <div
                style={{
                  width: '200px',
                  height: '100%',
                  position: 'relative',
                  aspectRatio: '1/1',
                  cursor: 'pointer',
                  transition: 'linear 1s',
                  border: `0.25rem solid ${themeValue.dark.colors.redHighland}`,
                  borderRadius: '5%',
                }}
                onClick={() => router.push(`/goods/${menuItem.goodsId}`)}
              >
                <ImageItem altname={menuItem.name} id={menuItem.goodsId} />
              </div>
              <div>
                <header
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '0.5px dotted #333',
                  }}
                >
                  <h5
                    style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
                    onClick={() => router.push(`/goods/${menuItem.goodsId}`)}
                  >
                    {name}
                  </h5>
                </header>
                <h4 style={{ color: themeValue.dark.colors.redHighland }}>
                  {Math.floor(applyPrice)} VND
                </h4>
              </div>
              <div
                style={{
                  backgroundColor: isHover === menuItem.goodsId ? '#b5313a' : '',
                  border: '2px solid #b5313a',
                  color: isHover === menuItem.goodsId ? '#fff' : '#b5313a',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  padding: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  fontWeight: 550,
                }}
                onMouseEnter={() => handleMouseEnter(menuItem.goodsId)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => {
                  addToCartHandler(1, 'S', menuItem.goodsId)
                  toast.success('Thêm vào giỏ hàng thành công')
                  dispatch(setReloadCrt(true))
                }}
              >
                <span> Chọn Mua</span>
              </div>
            </article>
          )
        })}
    </div>
  )
}

export default Product
