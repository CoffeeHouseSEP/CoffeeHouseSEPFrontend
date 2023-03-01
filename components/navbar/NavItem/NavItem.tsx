import Link from 'next/link'

interface INavbarInternal {
  text: string
  href: any
  active: boolean
}
const NavItem = ({ text, href, active }: INavbarInternal) => {
  return (
    <Link href={href}>
      <div className={`nav__item ${active ? 'active' : ''}`}>{text}</div>
    </Link>
  )
}

export default NavItem
