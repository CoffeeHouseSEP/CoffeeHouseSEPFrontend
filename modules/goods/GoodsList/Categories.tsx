import { useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import { CategoryItem } from '@/types'

interface PropCategory {
  filterItems: (categoryId: number) => void
  categoryId?: number
  category?: CategoryItem[]
}
const Categories = ({ filterItems, categoryId, category }: PropCategory) => {
  const pixel = useResponsive()
  const handlefilterItems = (categoryId: number) => {
    filterItems(categoryId)
  }
  const filterAllItems = () => {
    filterItems(-1)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#333',
          padding: 50,
          marginBottom: '4rem',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: !categoryId ? themeValue.dark.colors.redHighland : 'transparent',
            borderColor: 'transparent',
            fontSize: pixel <= 500 ? '0.5rem' : '1rem',
            textTransform: 'capitalize',
            margin: '0 0.5rem',
            letterSpacing: '1px',
            padding: '0.375rem 0.75rem',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '5%',
          }}
          onClick={() => filterAllItems()}
        >
          All
        </div>
        {category &&
          category.map((category) => {
            return (
              <div>
                <div
                  style={{
                    background:
                      categoryId === category.categoryId
                        ? themeValue.dark.colors.redHighland
                        : 'transparent',
                    borderColor: 'transparent',
                    fontSize: pixel <= 500 ? '0.5rem' : '1rem',
                    textTransform: 'capitalize',
                    margin: pixel <= 500 ? '' : '0 0.5rem',
                    letterSpacing: '1px',
                    padding: '0.375rem 0.75rem',
                    color: '#fff',
                    cursor: 'pointer',
                    borderRadius: '5%',
                  }}
                  key={category.categoryId}
                  onClick={() => handlefilterItems(category.categoryId)}
                >
                  {category.name}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Categories
