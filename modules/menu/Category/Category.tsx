import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './Category.module.css'

const cx = classNames.bind(styles)
interface PropCategory {
  categories: string[]
  filterItems: (category: string) => void
}

const Categories = ({ categories, filterItems }: PropCategory) => {
  const [activeCategory, setActiveCategory] = useState(0)
  function handleChangeCategory(index: number, category: string) {
    setActiveCategory(index)
    filterItems(category)
  }
  return (
    <div className={cx('btn-container')}>
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={cx('filter-btn', {
              active: activeCategory === index,
            })}
            key={category}
            onClick={() => handleChangeCategory(index, category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default Categories
