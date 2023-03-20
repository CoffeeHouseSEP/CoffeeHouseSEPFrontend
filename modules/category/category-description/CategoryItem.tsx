import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

interface IGridCategory {
  list: CategoryItem[]
}

export default function CategoryItemView({ list }: IGridCategory) {
  const [isHover, setIsHover] = useState<number>()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const handleMouseEnter = (id: number) => {
    setIsHover(id)
  }
  const handleMouseLeave = () => {
    setIsHover(-1)
  }
  return (
    <div style={{ display: 'flex', flexBasis: '1' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          flexWrap: 'wrap',
          justifyContent: ' space-between',
        }}
      >
        {list.map((item) => (
          <div key={item.categoryId}>
            <div
              style={{
                background: 'linear-gradient(to right, #232526, #414345)',
                width: '100%',
                padding: '60px 100px',
              }}
            >
              <a
                onMouseEnter={() => handleMouseEnter(item.categoryId)}
                onMouseLeave={() => handleMouseLeave()}
                style={{
                  fontSize: '45px',
                  lineHeight: '55px',
                  textTransform: 'uppercase',
                  display: 'block',
                  cursor: 'pointer',
                  color:
                    isHover === item.categoryId
                      ? themeValue[darkTheme].colors.orangeHighLand
                      : '#FAEBD7',
                  transition: 'linear 1s',
                }}
                href="#"
              >
                {item.name}
              </a>
              <p style={{ color: '#faebd7' }}>{item.description}</p>
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
        ))}
      </div>
      <div
        style={{
          width: '50%',
          height: '459px',
          position: 'relative',
          top: 0,
          bottom: 0,
          aspectRatio: '1/1',
        }}
      >
        <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
        <div style={{ position: 'absolute', top: 60, left: 100 }}>
          <h3> TIN MỚI NHẤT</h3>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Image src="/asset/tet1.jpg" width={120} height={80} alt="Tet1" />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
              <h5 style={{ textTransform: 'uppercase' }}>Đón tết này khác lạ với hightlands</h5>
              <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                28/12/2022
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px 0',
              cursor: 'pointer',
            }}
          >
            <Image src="/asset/tet2.jpg" width={120} height={80} alt="Tet1" />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
              <h5 style={{ textTransform: 'uppercase' }}>HIGHLANDS COFFEE LÀ CỦA CHÚNG MÌNH!</h5>
              <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                28/12/2022
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Image src="/asset/tet3.jpg" width={120} height={80} alt="Tet1" />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
              <h5 style={{ textTransform: 'uppercase' }}>
                ĐÊM TRĂNG DIỆU KỲ CÙNG HIGHLANDS COFFEE
              </h5>
              <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                28/12/2022
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
