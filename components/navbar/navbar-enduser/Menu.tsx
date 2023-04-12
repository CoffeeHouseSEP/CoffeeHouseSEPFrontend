import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType, GoodsItem } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GridCategory } from './GridCategory'

interface MenuItem {
  label: string
  menu?: React.ReactNode
  link: string
}

export const Menu = () => {
  const [goodList, setGoodList] = useState<GoodsItem[]>([])
  const pageSize = '10'
  const { isLoggedIn } = useSelector(authenticationSelector)
  // const { data, loading, setLetCall } = category
  const goods = useApiCall<CommonListResultType<GoodsItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: '1', pageSize },
      }),
    handleSuccess(message, data) {
      setGoodList(data.data)
    },
    preventLoadingGlobal: true,
  })

  useEffect(() => {
    goods.setLetCall(true)
  }, [])
  const [isHover, setHover] = useState<string>('')
  const [menuHover, setMenuHover] = useState<string>('')
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])

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
      menu: <GridCategory setHover={setMenuHover} list={cateItem} goodList={goodList} />,
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
      link: '/goods/listgoods',
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

  const styleHover = (label: string) => {
    return {
      backgroundColor:
        isHover === label || menuHover === label
          ? themeValue[darkTheme].colors.brownHoverHighLand
          : undefined,
      height: '70%',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 10px',
      zIndex: 2,
      color: '#fff',
      cursor: 'pointer',
    }
  }
  return (
    <>
      {menuList.map((item) => {
        if (item.menu)
          return (
            <div
              style={styleHover(item.label)}
              onMouseEnter={() => {
                setHover(item.label)
                setMenuHover(item.label)
              }}
              onMouseLeave={() => setHover('')}
              onClick={() => router.push(item.link)}
            >
              {item.label}
            </div>
          )
        return (
          <div
            style={styleHover(item.label)}
            onMouseEnter={() => {
              setHover(item.label)
              setMenuHover('')
            }}
            onMouseLeave={() => setHover('')}
            onClick={() => router.push(item.link)}
          >
            {item.label}
          </div>
        )
      })}
      <div
        style={{
          position: 'fixed',
          top: 122,
          left: 0,
          right: 0,
          backgroundColor: themeValue[darkTheme].colors.brownHoverHighLand,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div style={{ width: 1280 }}>{menuList.find((item) => item.label === menuHover)?.menu}</div>
      </div>
      {menuHover && (
        <div
          style={{
            position: 'fixed',
            transition: 'linear 1s',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
          onMouseEnter={() => setMenuHover('')}
        />
      )}
    </>
  )
}
