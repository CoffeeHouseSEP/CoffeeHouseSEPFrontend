import { ROLE_COOKIE } from '@/constants/auth'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Backdrop } from '../backdrop'
import { AccountInformation } from './AccountInformation'
import { SideIconItem } from './SideIconItem'

interface ISideBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  pixel: number
}

interface SidebarItem {
  label: string
  path: string
  icon: string
}

interface SidebarList {
  mainItem: SidebarItem
}

export const SideBar = ({ isOpenSideBar, setOpenSideBar, pixel }: ISideBar) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [cookies] = useCookies([ROLE_COOKIE])
  let sidebar: SidebarList[] = [
    {
      mainItem: { label: 'Dashboard', path: '/admin', icon: '' },
    },

    {
      mainItem: { label: 'UserManagement', path: '/admin/user/management', icon: '' },
    },
    {
      mainItem: { label: 'CategoryManagement', path: '/admin/category/management', icon: '' },
    },
    {
      mainItem: { label: 'GoodManagement', path: '/admin/good/management', icon: '' },
    },
    {
      mainItem: { label: 'NewsManagement', path: '/admin/news/management', icon: '' },
    },
  ]

  if (cookies.role === 'ADMIN') {
    sidebar = [
      ...sidebar,
      {
        mainItem: { label: 'BranchManagement', path: '/admin/branch/management', icon: '' },
      },
      {
        mainItem: { label: 'RequestManagement', path: '/admin/request/management', icon: '' },
      },
    ]
  }
  if (cookies.role === 'BRANCH_MANAGER') {
    sidebar = [
      ...sidebar,
      {
        mainItem: { label: 'RequestManagement', path: '/branch/request/management', icon: '' },
      },
      {
        mainItem: { label: 'OrderManagement', path: '/admin/orders/management', icon: '' },
      },
    ]
  }

  return (
    <>
      <Backdrop
        isShow={pixel < 1280 && isOpenSideBar}
        zIndex={49}
        style={{
          top: 60,
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          backgroundColor: 'transparent',
        }}
        onClick={() => {
          setOpenSideBar(false)
        }}
      />
      <div
        style={{
          width: pixel >= 1280 || isOpenSideBar ? 300 : 0,
          position: 'fixed',
          top: 60,
          left: 0,
          bottom: 0,
          zIndex: pixel >= 1280 ? 2 : 50,
          boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
          fontWeight: 500,
          transition: 'all 0.2s linear',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
        }}
      >
        {pixel < 1280 && !isOpenSideBar ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'transparent',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 1,
            }}
          />
        ) : null}
        <AccountInformation />

        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 120px)',
            borderTop: `1px solid ${themeValue[darkTheme].colors.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: pixel >= 1280 || isOpenSideBar ? 300 : 0,
              alignItems: 'center',
            }}
          >
            {sidebar.map((item) => (
              <SideIconItem link={item.mainItem.path} label={item.mainItem.label} isLabel />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
