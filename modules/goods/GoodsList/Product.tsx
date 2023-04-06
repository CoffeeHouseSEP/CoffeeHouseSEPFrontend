import ImageItem from '@/modules/news/Image/ImageItem'
import { GoodsRequest } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
                  border: '0.25rem solid #2c2891',
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
                  <h4 style={{ color: '#2c2891' }}>₹{Math.floor(applyPrice) * 10}</h4>
                </header>
              </div>
              <div
                style={{
                  marginTop: '10px',
                  backgroundColor: isHover === menuItem.goodsId ? '#b5313a' : '',
                  border: '1px solid #b5313a',
                  color: isHover === menuItem.goodsId ? '#fff' : '#b5313a',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  padding: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
                onMouseEnter={() => handleMouseEnter(menuItem.goodsId)}
                onMouseLeave={() => handleMouseLeave()}
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
