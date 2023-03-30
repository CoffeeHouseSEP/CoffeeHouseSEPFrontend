import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
import React, { useEffect, useState } from 'react'

interface PropCategory {
  filterItems: (categoryId: number) => void
}
const Categories = ({ filterItems }: PropCategory) => {
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  const [activeCategory, setActiveCategory] = useState(-1)
  const handlefilterItems = (categoryId: number, index: number) => {
    filterItems(categoryId)
    setActiveCategory(index)
  }
  const filterAllItems = () => {
    filterItems(-1)
    setActiveCategory(-1)
  }

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
        params: { status: 1 },
      }),
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
  })
  useEffect(() => {
    category.setLetCall(true)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
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
            background: activeCategory === -1 ? '#2c2891' : 'transparent',
            borderColor: 'transparent',
            fontSize: '1rem',
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
        {cateItem.map((category, index) => {
          return (
            <div>
              <div
                style={{
                  background: activeCategory === index ? '#2c2891' : 'transparent',
                  borderColor: 'transparent',
                  fontSize: '1rem',
                  textTransform: 'capitalize',
                  margin: '0 0.5rem',
                  letterSpacing: '1px',
                  padding: '0.375rem 0.75rem',
                  color: '#fff',
                  cursor: 'pointer',
                  borderRadius: '5%',
                }}
                key={category.categoryId}
                onClick={() => handlefilterItems(category.categoryId, index)}
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
