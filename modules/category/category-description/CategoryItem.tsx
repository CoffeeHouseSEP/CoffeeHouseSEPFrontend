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
  const [isHover, setIsHover] = useState<string>()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const handleMouseEnter = (id: string) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover('-1')
  }

  return (
    <div>
      {list.map((item) => {
        const listFiltered = goodList?.filter((name) => name.categoryId === item.categoryId)
        return (
          <div
            key={item.categoryId}
            style={{
              background: 'linear-gradient(to right, #232526, #414345)',
              width: '100%',
              height: '100%',
              padding: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: pixel <= 980 ? 'column' : 'row',
                alignItems: 'center',
                gap: pixel <= 980 ? 0 : 100,
                marginBottom: '15px',
                marginLeft: pixel <= 980 ? '0' : '200px',
              }}
            >
              <div style={{ width: '100%' }}>
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
                      onClick={() => router.push(`/goods/listgoods?categoryId=${item.categoryId}`)}
                    >
                      KHÁM PHÁ THÊM
                    </button>
                  </a>
                </div>
              </div>
              <div style={{ width: '100%', margin: pixel <= 980 ? '0' : '20px' }}>
                {listFiltered[0] && (
                  <div
                    style={{
                      margin: pixel <= 980 ? '10px 0' : '20px 0',
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
  )
}
