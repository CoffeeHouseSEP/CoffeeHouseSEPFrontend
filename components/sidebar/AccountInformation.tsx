import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { SettingButton } from './SettingButton'
import { SignOutButton } from './SignOutButton'

export const AccountInformation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        width: '100%',
        height: '120px',
        aspectRatio: '1/1',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          padding: '0 10px',
          justifyContent: 'left',
          alignItems: 'center',
          gap: 10,
          position: 'relative',
        }}
      >
        <Image src="/facebook_cover_photo_1.png" layout="fill" />
        <div
          style={{
            height: '60%',
            aspectRatio: '1 / 1',
            position: 'relative',
            borderRadius: '100%',
            border: `2px solid ${themeValue[darkTheme].colors.border}`,
            boxShadow: themeValue[darkTheme].shadows.lg,
          }}
        >
          <Image src="/default-avatar.jpg" layout="fill" style={{ borderRadius: '100%' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>name</div>
          <div
            style={{
              height: '40px',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: themeValue[darkTheme].colors.redHighland,
              borderRadius: '100%',
              border: `2px solid ${themeValue[darkTheme].colors.orangeHighLand}`,
              boxShadow: themeValue[darkTheme].shadows.lg,
            }}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: isOpen ? 'calc(100% - 120px)' : 0,
          transition: 'all 0.3s linear',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <SettingButton />
        <SignOutButton />
      </div>
    </div>
  )
}
