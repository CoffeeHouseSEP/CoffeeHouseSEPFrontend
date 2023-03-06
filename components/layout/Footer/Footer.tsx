import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
// import the icons you need
import classNames from 'classnames/bind'
import styles from './Footer.module.css'

const cx = classNames.bind(styles)
export default function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('wrapper1')}>
        <div className={cx('vntbutton')}>
          <div className="button-wrap">
            <div className={cx('buttons')}>
              <a
                href="https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html"
                className="btn-mm text-decoration-none"
              >
                <span className="fa-map-marker">VIEW MAP</span>
              </a>
            </div>
          </div>
        </div>

        <div className="copyRight text-white">© 2018 Highlands Coffee. All rights reserved</div>
        <div className="linkFooter">
          <a href="" className="text-decoration-none">
            <span className="fa-paper-plane-o text-white text-decoration-none">
              Đăng ký để nhận bản tin
            </span>
          </a>
        </div>
        <div className="linkFooter mb">
          <a href="mailto:customerservice@highlandscoffee.com.vn" className="text-decoration-none">
            <span className="fa-envelope-o text-white">customerservice@highlandscoffee.com.vn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
