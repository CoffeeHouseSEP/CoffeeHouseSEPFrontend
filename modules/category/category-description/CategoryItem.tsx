import { useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import ImageItem from '@/modules/news/Image/ImageItem'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem, GoodsItem } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface IGridCategory {
  goodList: GoodsItem[]
  list: CategoryItem[]
}

export default function CategoryItemView({ list, goodList }: IGridCategory) {
  const pixel = useResponsive()
  const router = useRouter()
  const [isHover, setIsHover] = useState<number>()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const handleMouseEnter = (id: number) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover(-1)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(auto-fit, minmax(200px,1fr)',
        }}
      >
        {list.map((item) => {
          const listFiltered = goodList?.filter((name) => name.categoryId === item.categoryId)
          return (
            <div
              key={item.categoryId}
              style={{
                background: 'linear-gradient(to right, #232526, #414345)',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr)',
                  alignItems: 'center',
                  gap: pixel <= 603 ? 0 : 100,
                  marginBottom: '15px',
                }}
              >
                <div style={{ marginLeft: pixel <= 603 ? '10px' : '20%' }}>
                  <a
                    onMouseEnter={() => handleMouseEnter(item.categoryId)}
                    onMouseLeave={() => handleMouseLeave()}
                    style={{
                      fontSize: '45px',
                      lineHeight: '55px',
                      textTransform: 'uppercase',
                      display: 'block',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color:
                        isHover === item.categoryId
                          ? themeValue[darkTheme].colors.orangeHighLand
                          : '#FAEBD7',
                      transition: 'linear 1s',
                      marginBottom: '15px',
                    }}
                    href="#"
                    onClick={() => router.push(`/goods/listgoods`)}
                  >
                    {item.name}
                  </a>
                  <div
                    style={{
                      color: '#faebd7',
                      fontSize: pixel <= 960 ? '14px' : '18px',
                      lineHeight: '26px',
                      fontWeight: 'bold',
                      marginBottom: '40px !important',
                      paddingBottom: '15px',
                    }}
                  >
                    {item.description}
                  </div>
                  <div>
                    <a>
                      <button
                        type="submit"
                        style={{
                          marginTop: 10,
                          padding: '7px 50px',
                          background: 'transparent',
                          color: '#FAEBD7',
                          cursor: 'pointer',
                          fontSize: '16px',
                          lineHeight: '24px',
                          border: '1px solid #fff',
                          marginBottom: pixel <= 960 ? 'auto' : '0',
                        }}
                      >
                        KHÁM PHÁ THÊM
                      </button>
                    </a>
                  </div>
                </div>
                <div>
                  {listFiltered[0] && (
                    <div
                      style={{
                        margin: pixel <= 380 ? 10 : 20,
                        width: '250px',
                        height: '100%',
                        aspectRatio: '1',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                      onClick={() => router.push(`/goods/${listFiltered[0]?.goodsId}`)}
                    >
                      <ImageItem altname={listFiltered[0]?.name} id={listFiltered[0]?.goodsId} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
