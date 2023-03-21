import { Dropdown } from '@/components/dropdown'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { OptionsType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Input } from '../../form'
import { Menu } from './Menu'

export const NavBarEndUser = () => {
  const [search, setSearch] = useState<string>('')
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const languageList: OptionsType<string>[] = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Vietnamese',
      value: 'vn',
    },
  ]
  const [language, setLanguage] = useState<string>(languageList[0].value)

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
                height: '100%',
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
            <Dropdown
              options={languageList}
              onClick={setLanguage}
              button={languageList.find((item) => item.value === language)?.label || ''}
              styleType="light"
              isCloseSelect
            />
            <div style={{ display: 'flex', gap: 0 }}>
              <Input
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
          <div
            style={{
              height: '50%',
              display: 'flex',
              gap: 15,
              alignItems: 'end',
            }}
          >
            <Menu />
          </div>
        </div>
      </div>
    </div>
  )
}
