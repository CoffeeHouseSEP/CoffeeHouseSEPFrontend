import React, { useState } from 'react'
import NavItem from './NavItem/NavItem'

const MENU_LIST = [
  { text: 'QUÁN CÀ PHÊ', href: '#' },
  { text: 'THỰC ĐƠN', href: '/menu' },
  { text: 'TIN TỨC', href: '#' },
  { text: 'CỘNG ĐỒNG', href: '/2' },
  { text: 'VỀ CHÚNG TÔI', href: '/3' },
  { text: 'MUA NGAY', href: '/5' },
  { text: 'ĐĂNG NHẬP', href: '/login' },
]
const Navbar = () => {
  const [navActive, setNavActive] = useState<any | null>(null)
  const [activeIdx, setActiveIdx] = useState(-1)

  return (
    <header>
      <nav className="nav">
        <div onClick={() => setNavActive(!navActive)} className="nav__menu-bar">
          <div />
          <div />
          <p style={{ color: '#fff', fontSize: '11px', textAlign: 'center' }}>Menu</p>
        </div>
        <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              className="item-menu"
              onClick={() => {
                setActiveIdx(idx)
                setNavActive(false)
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
