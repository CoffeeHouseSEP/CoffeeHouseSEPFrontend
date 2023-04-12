import { Input } from '@/components/form'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { GridCategoryMobile } from './GridCategoryMobile'

interface MenuItem {
  label: string
  menu?: React.ReactNode
  link: string
}

export const MenuMobile = () => {
  const [isHover1, setIsHover1] = useState<boolean>(false)
  const handleMouseEnter = () => {
    setIsHover1(true)
  }
  const handleMouseLeave = () => {
    setIsHover1(false)
  }
  const { isLoggedIn } = useSelector(authenticationSelector)
  // const { data, loading, setLetCall } = category
  const [menu, setMenu] = useState<Boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isHover, setHover] = useState<string>('')
  const [menuHover, setMenuHover] = useState<string>('')
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
        params: {
          status: 1,
        },
      }),
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    category.setLetCall(true)
  }, [])

  let menuList: MenuItem[] = [
    {
      label: 'QUÁN CÀ PHÊ',
      link: '/store/stores',
    },
    {
      label: 'THỰC ĐƠN',
      menu: <GridCategoryMobile list={cateItem} />,
      link: '/menu',
    },
    {
      label: 'TIN TỨC',
      link: '/news/listnews',
    },
    {
      label: 'VỀ CHÚNG TÔI',
      link: '/aboutus',
    },
    {
      label: 'MUA NGAY',
      link: '/shopping',
    },
  ]

  if (isLoggedIn) {
    menuList = [
      ...menuList,
      {
        label: 'TÀI KHOẢN',
        link: '/account',
      },
      {
        label: 'GIỎ HÀNG',
        link: '/cart',
      },
      {
        label: 'ĐƠN HÀNG',
        link: '/my-order',
      },
    ]
  } else {
    menuList = [
      ...menuList,
      {
        label: 'ĐĂNG NHẬP',
        link: '/login',
      },
    ]
  }

  return (
    <div>
      <div
        style={{
          color: isHover1 ? '#53382c' : '#ffffff',
          backgroundColor: isHover1 ? '#ffffff' : '#53382c',
          width: 50,
          height: 50,
          position: 'relative',
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setMenu(true)}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#53382c',
            borderBottom: isHover1 ? '3px solid #53382c ' : '3px solid #fff',
            width: '60%',
            margin: '0 auto',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#53382c',
            borderBottom: isHover1 ? '3px solid #53382c ' : '3px solid #fff',
            width: '60%',
            margin: '0 auto',
          }}
        />
        <div />
        <span
          style={{
            fontSize: '10px',
            position: 'absolute',
            transform: 'translateX(-50%)',
            left: '50%',
            top: '65%',
          }}
        >
          Menu
        </span>
      </div>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          display: menu ? 'block' : 'none',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          background: '#DDDDDD',
          position: 'fixed',
          width: menu ? '100%' : '0%',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          transition: 'all 1s',
        }}
      >
        <BiExit
          style={{
            fontSize: '40px',
            color: '#333',
            cursor: 'pointer',
          }}
          onClick={() => setMenu(false)}
        />
        {menuList.map((item) => {
          if (item.menu)
            return (
              <div
                style={{
                  color: isHover === item.label || menuHover === item.label ? '#fff' : '#333333',
                  padding: '13px 15px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  border: 'solid 1px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor:
                    isHover === item.label || menuHover === item.label
                      ? themeValue[darkTheme].colors.brownHoverHighLand
                      : undefined,
                  zIndex: 2,
                }}
                onMouseEnter={() => {
                  setHover(item.label)
                  setMenuHover(item.label)
                }}
                onMouseLeave={() => setHover('')}
              >
                <div
                  style={{ width: '100%' }}
                  onClick={() => {
                    router.push(item.link)
                    setMenu(false)
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    height: '50px',
                    aspectRatio: '1/1',
                    display: menu ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'absolute',
                    borderLeft: '1px solid rgba(0,0,0,0.2)',
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    setIsOpen(!isOpen)
                  }}
                >
                  {isOpen ? <AiOutlineRight /> : <AiOutlineDown />}
                </div>
              </div>
            )
          return (
            <div
              onClick={() => {
                router.push(item.link)
                setMenu(false)
              }}
              onMouseEnter={() => {
                setHover(item.label)
                setMenuHover(item.label)
              }}
              onMouseLeave={() => setHover('')}
              style={{
                color: isHover === item.label || menuHover === item.label ? '#fff' : '#333333',
                padding: '13px 15px',
                fontSize: '16px',
                lineHeight: '24px',
                border: 'solid 1px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor:
                  isHover === item.label || menuHover === item.label
                    ? themeValue[darkTheme].colors.brownHoverHighLand
                    : undefined,
                zIndex: 2,
              }}
            >
              {item.label}
            </div>
          )
        })}
        <div
          style={{
            position: 'fixed',
            top: 146,
            backgroundColor: '#DDDDDD',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <div style={{ width: 1280 }}>{isOpen && <GridCategoryMobile list={cateItem} />}</div>
        </div>
        {menuHover && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
            onMouseEnter={() => setMenuHover('')}
          />
        )}
        <div
          style={{
            display: 'flex',
            gap: 0,
            padding: 15,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            style={{
              padding: 5,
              width: '100%',
              height: '100%',
              backgroundColor: themeValue[darkTheme].colors.background,
            }}
            placeholder="Tìm kiếm..."
          />
          <div
            style={{
              backgroundColor: themeValue[darkTheme].colors.background,
              display: 'flex',
              paddingRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AiOutlineSearch />
          </div>
        </div>
      </div>
    </div>
  )
}
