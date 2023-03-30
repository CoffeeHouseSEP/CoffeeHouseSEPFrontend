import ImageItem from '@/modules/news/Image/ImageItem'
import { GoodsItem } from '@/types'
import { useState } from 'react'

interface PropProduct {
  items: GoodsItem[]
}
const Product = ({ items }: PropProduct) => {
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
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '3rem 2rem',
        justifyItems: 'center',
      }}
    >
      {items.map((menuItem) => {
        const { id, name, applyPrice, description } = menuItem
        return (
          <article key={id} style={{ display: 'grid', maxWidth: '25rem' }}>
            {/* <img
              src="/asset/Matcha.png"
              alt={name}
              style={{
                objectFit: 'cover',
                height: '200px',
                border: '0.25rem solid #2c2891',
                borderRadius: '5%',
                display: 'block',
                margin: '0 auto',
              }}
            /> */}
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
                <h5 style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>{name}</h5>
                <h4 style={{ color: '#2c2891' }}>₹{Math.floor(applyPrice) * 10}</h4>
              </header>
            </div>
            <p style={{ marginBottom: 0, paddingTop: '0.5rem' }}>{description}</p>
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
