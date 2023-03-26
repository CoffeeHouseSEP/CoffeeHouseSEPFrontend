import { GoodsItem } from '@/types'
import React from 'react'

interface PropProduct {
  items: GoodsItem[]
}
const Product = ({ items }: PropProduct) => {
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
            <img
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
            />
            <div>
              <header
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '0.5px dotted #333',
                }}
              >
                <h5 style={{ marginBottom: '0.5rem' }}>{name}</h5>
                <h4 style={{ color: '#2c2891' }}>₹{Math.floor(applyPrice) * 10}</h4>
              </header>
            </div>
            <p style={{ marginBottom: 0, paddingTop: '0.5rem' }}>{description}</p>
          </article>
        )
      })}
    </div>
  )
}

export default Product
