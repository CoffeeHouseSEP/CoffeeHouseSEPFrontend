import { CategoryItem } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface IGridCategory {
  list: CategoryItem[]
  handleMenu: Function
}

export const GridCategoryMobile = ({ list, handleMenu }: IGridCategory) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState<string>()

  const handleMouseEnter = (id: string) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'repeat(5, minmax(0, 1fr))' }}>
      {list.map((item) => (
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              padding: '14px 15px',
              paddingLeft: '35px',
              color: isHover === item.name ? '#b22830' : '#333333',
              cursor: 'pointer',
            }}
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={() => handleMouseLeave()}
            key={item.categoryId}
            onClick={() => {
              router.push('/menu')
              handleMenu(false)
            }}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  )
}
