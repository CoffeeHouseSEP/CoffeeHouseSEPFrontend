import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem } from '@/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface IGridCategory {
  list: CategoryItem[]
  setHover: (value: string) => void
}

export const GridCategory = ({ list, setHover }: IGridCategory) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [isHover, setIsHover] = useState<number>()

  const handleMouseEnter = (id: number) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover(-1)
  }

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
      onMouseLeave={() => setHover('')}
    >
      {list.map((item) => (
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              padding: '10px 10px',
              color:
                isHover === item.categoryId ? '#fff' : themeValue[darkTheme].colors.orangeHighLand,
              transition: 'linear 1s',
              cursor: 'pointer',
            }}
            onMouseEnter={() => handleMouseEnter(item.categoryId)}
            onMouseLeave={() => handleMouseLeave()}
            key={item.categoryId}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  )
}
