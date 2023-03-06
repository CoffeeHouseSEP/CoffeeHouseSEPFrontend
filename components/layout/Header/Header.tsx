import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
// import the icons you need
import Navbar from '@/components/navbar/NavBar'
import classNames from 'classnames/bind'
import Link from 'next/link'
import styles from './Header.module.css'

const cx = classNames.bind(styles)
export default function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('wrapper')}>
        <div className={cx('logo')}>
          <Link href="/">
            <Image
              className={cx('imagelogo')}
              width={110}
              height={85}
              src="/asset/logo.png"
              alt=""
            />
          </Link>
        </div>
        <div className="headertools">
          <div className={cx('rowTools')}>
            <div className={cx('searchTop')}>
              <form>
                <input className="text_search" placeholder="Từ khóa ..." />
                <button type="submit">
                  <Image src="/asset/i-search.svg" height={15} width={15} alt="" />
                </button>
              </form>
            </div>
            <div className={cx('languageTop')}>
              <ul>
                <li>
                  <a href="#">
                    <Image src="/asset/flag-vn.jpg" width={33} height={25} alt="EN" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Image src="/asset/flag-en.jpg" height={25} width={33} alt="VN" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Navbar />
        </div>
      </div>
    </header>
  )
}
