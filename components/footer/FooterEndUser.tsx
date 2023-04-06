import { useResponsive } from '@/hooks'
import React from 'react'

export default function FooterEndUser() {
  const pixel = useResponsive()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: pixel <= 1280 ? 'column' : 'row',
        background: '#53382c',
        justifyContent: 'space-evenly',
        padding: 20,
        color: '#fff',
        textAlign: 'center',
      }}
    >
      {pixel <= 1280 && (
        <div
          style={{ maxWidth: '364px', width: '100%', margin: '0 auto', float: 'none', padding: 5 }}
        >
          <a
            style={{
              display: 'block',
              fontSize: '20px',
              lineHeight: '28px',
              textTransform: 'uppercase',
              padding: '11px 15px',
              background: '#b22830',
              textAlign: 'center',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            {' '}
            <span>VIEW MAP</span>
          </a>
        </div>
      )}
      <div>© 2018 Highlands Coffee. All rights reserved</div>
      <div style={{ margin: '10px 0' }}>Đăng ký để nhận bản tin</div>
      <div>customerservice@highlandscoffee.com.vn</div>
    </div>
  )
}
