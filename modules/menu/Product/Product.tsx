/* eslint-disable @next/next/no-img-element */
import { ProductItem } from '@/types'
import classNames from 'classnames/bind'
import styles from './Product.module.css'

const cx = classNames.bind(styles)
interface PropProduct {
  items: ProductItem[]
}
const Product = ({ items }: PropProduct) => {
  return (
    <div className={cx('section-center')}>
      {items.map((menuItem) => {
        const { id, title, img, desc, price } = menuItem
        return (
          <article key={id} className={cx('menu-item')}>
            <img src={img} alt={title} className={cx('photo')} />
            <div className={cx('item-info')}>
              <header>
                <h4>{title}</h4>
                <h4 className={cx('price')}>₹{Math.floor(price) * 10}</h4>
              </header>
              <p className={cx('item-text')}>{desc}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Product
