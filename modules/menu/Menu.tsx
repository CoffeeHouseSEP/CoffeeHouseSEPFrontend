import { ProductItem } from '@/types'
import classNames from 'classnames/bind'
import { useState } from 'react'
import Categories from './Category/Category'
import items from './data'
import styles from './Menu.module.css'
import Product from './Product/Product'

const allCategories = ['all', ...new Set(items.map((item) => item.category))]

const cx = classNames.bind(styles)
function Menu() {
  const [menuItems, setMenuItems] = useState<ProductItem[]>(items)
  const [categories, setCategories] = useState(allCategories)

  const filterItems = (category: string) => {
    setCategories(categories)
    if (category === 'all') {
      setMenuItems(items)
      return
    }
    const newItems = items.filter((item) => item.category === category)
    setMenuItems(newItems)
  }

  return (
    <main>
      <section className={cx('menu', 'section')}>
        <div className={cx('title')}>
          <h2>our menu</h2>
          <div className={cx('underline')} />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Product items={menuItems} />
      </section>
    </main>
  )
}

export default Menu
