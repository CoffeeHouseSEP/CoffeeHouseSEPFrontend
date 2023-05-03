import { SignOutButton } from '@/components/sidebar/SignOutButton'
import { useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ShareStoreSelector, setReloadCrt } from '@/redux/share-store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from './Menu'
import { MenuMobile } from './MenuMobile'

export const NavBarEndUser = () => {
  const pixel = useResponsive()
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const { isLoggedIn } = useSelector(authenticationSelector)
  const { reloadCart } = useSelector(ShareStoreSelector)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setReloadCrt(true))
  }, [router])

  const [cart, setCart] = useState<{ id: string; qty: number; size: 'M' | 'S' | 'L' }[]>([])

  useEffect(() => {
    if (reloadCart && typeof window !== 'undefined') {
      const cartLocal = localStorage.getItem('cart')
      if (cartLocal) {
        const list: { id: string; qty: number; size: 'M' | 'S' | 'L' }[] = JSON.parse(cartLocal)
        setCart(list)
      } else {
        setCart([])
      }
      dispatch(setReloadCrt(false))
    }
  }, [reloadCart])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 122,
        backgroundColor: themeValue[darkTheme].colors.redHighland,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 20px',
        zIndex: '1000',
      }}
    >
      <div style={{ height: '100%', width: 1280, display: 'flex', gap: 50 }}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <div
              style={{
                height: '80%',
                aspectRatio: '4 / 3',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <Image src="/logo_transparent.png" layout="fill" />
            </div>
          </Link>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              height: '50%',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'end',
              gap: 10,
            }}
          >
            <div style={{ display: pixel <= 980 ? 'none' : 'flex', gap: 0 }}>
              {/* <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                style={{
                  width: 200,
                  height: '100%',
                  backgroundColor: themeValue[darkTheme].colors.background,
                }}
                placeholder="Tìm kiếm..."
              /> */}
              {/* <div
                style={{
                  backgroundColor: themeValue[darkTheme].colors.background,
                  display: 'flex',
                  paddingRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AiOutlineSearch />
              </div> */}
            </div>
            {isLoggedIn && pixel > 980 && (
              <div style={{ width: '100px' }}>
                <SignOutButton
                  style={{
                    color: 'white',
                    borderBottom: `1px solid ${'white'}`,
                  }}
                />
              </div>
            )}
          </div>
          {pixel <= 980 ? (
            <div style={{ position: 'absolute', top: 65, right: 40 }}>
              <MenuMobile cartLength={cart.length} />
            </div>
          ) : (
            <div
              style={{
                height: '50%',
                display: 'flex',
                gap: 15,
                alignItems: 'end',
                justifyContent: 'end',
              }}
            >
              <Menu cartLength={cart.length} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
