import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
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
  const sidebar: SidebarList[] = [
    {
      mainItem: { label: 'Dashboard', path: '/admin', icon: '' },
    },
  ]

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
              <SideIconItem
                link={item.mainItem.path}
                image={item.mainItem.icon}
                label={item.mainItem.label}
                isLabel
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
