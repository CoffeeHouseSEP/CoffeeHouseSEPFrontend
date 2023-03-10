import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { getMethod } from '@/services'
import { CategoryItem, CommonListResultType } from '@/types'
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
  const [isHover, setHover] = useState<string>('')
  const [menuHover, setMenuHover] = useState<string>('')
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cateItem, setCateItem] = useState<CategoryItem[]>([])

  const router = useRouter()

  const category = useApiCall<CommonListResultType<CategoryItem>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
      }),
    handleSuccess(message, data) {
      setCateItem(data.data)
    },
  })

  useEffect(() => {
    category.setLetCall(true)
  }, [])

  const menuList: MenuItem[] = [
    {
      label: 'Quan ca phe',
      link: 'stores',
    },
    {
      label: 'Thuc don',
      menu: <GridCategory setHover={setMenuHover} list={cateItem} />,
      link: 'stores',
    },
  ]

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
