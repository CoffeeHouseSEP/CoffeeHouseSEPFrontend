import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface IGridCategory {
  list: CategoryItem[]
}

export default function CategoryItemView({ list }: IGridCategory) {
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
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          flexWrap: 'wrap',
          height: '100%',
          justifyContent: ' space-between',
        }}
      >
        {list.map((item) => (
          <div
            key={item.categoryId}
            style={{
              padding: '80px 170px',
              background: 'linear-gradient(to right, #232526, #414345)',
              width: '100%',
              height: '100%',
            }}
          >
            <div>
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
                onClick={() => router.push(`/goods`)}
              >
                {item.name}
              </a>
              <div
                style={{
                  color: '#faebd7',
                  fontSize: '18px',
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
                    }}
                  >
                    KHÁM PHÁ THÊM
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          width: '50%',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#333',
        }}
      >
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '400px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/coffee.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '400px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/Matcha.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '400px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/Tra.png" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
