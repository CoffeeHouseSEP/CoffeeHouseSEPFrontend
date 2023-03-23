import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem, GoodsItem } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'

interface IGridCategory {
  list: CategoryItem[]
  setHover: (value: string) => void
  goodList: GoodsItem[]
}

export const GridCategory = ({ list, setHover, goodList }: IGridCategory) => {
  const router = useRouter()
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
      onClick={() => router.push('/menu')}
    >
      {list.map((item) => (
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              padding: '10px 10px',
              fontWeight: 'bold',
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
          {goodList
            ?.filter((name) => name.categoryId === item.categoryId)
            .map((filteredName) => (
              <div
                style={{
                  width: '100%',
                  padding: '10px 10px',
                  color: '#fff',
                  transition: 'linear 1s',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '22px',
                }}
                key={filteredName.id}
              >
                <AiFillCaretRight /> {filteredName.name}
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
