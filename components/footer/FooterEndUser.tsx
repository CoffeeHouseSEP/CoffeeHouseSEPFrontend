import { useResponsive } from '@/hooks'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillInstagram,
  AiOutlineSend,
  AiOutlineMail,
} from 'react-icons/ai'

export default function FooterEndUser() {
  const [isHover, setIsHover] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }
  const [isHover1, setIsHover1] = useState<boolean>(false)

  const handleMouseEnter1 = () => {
    setIsHover1(true)
  }
  const handleMouseLeave1 = () => {
    setIsHover1(false)
  }
  const pixel = useResponsive()
  const router = useRouter()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: pixel <= 1280 ? 'column' : 'row',
        background: '#53382c',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 25,
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {pixel <= 1280 && (
        <div
          style={{ maxWidth: '364px', width: '100%', margin: '0 auto', float: 'none', padding: 5 }}
          onClick={() => router.push('/store/stores')}
        >
          <a
            style={{
              display: 'block',
              fontSize: '20px',
              lineHeight: '28px',
              textTransform: 'uppercase',
              padding: '15px 15px',
              background: '#b22830',
              textAlign: 'center',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <span>VIEW MAP</span>
          </a>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: pixel <= 1280 ? 'column' : 'row',
          padding: 5,
        }}
      >
        <div style={{ marginRight: '15px' }}>
          <AiFillFacebook style={{ fontSize: '1.5rem', cursor: 'pointer' }} />{' '}
          <AiFillYoutube style={{ fontSize: '1.5rem', cursor: 'pointer' }} />{' '}
          <AiFillInstagram style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
        </div>
        <div style={{ fontSize: '13px', lineHeight: '21px' }}>
          © 2018 Highlands Coffee. All rights reserved
        </div>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: isHover ? '#f1bc7a' : '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: 5,
        }}
      >
        <div style={{ marginRight: '15px' }}>
          <AiOutlineSend style={{ fontSize: '13px', lineHeight: '21px' }} />
        </div>
        <div style={{ fontSize: '13px', lineHeight: '21px' }}> Đăng ký để nhận bản tin</div>
      </div>
      <div
        onMouseEnter={handleMouseEnter1}
        onMouseLeave={handleMouseLeave1}
        style={{
          color: isHover1 ? '#f1bc7a' : '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: '15px' }}>
          <AiOutlineMail style={{ fontSize: '13px', lineHeight: '21px' }} />
        </div>
        <div style={{ fontSize: '13px', lineHeight: '21px' }}>
          customerservice@highlandscoffee.com.vn
        </div>
      </div>
    </div>
  )
}
