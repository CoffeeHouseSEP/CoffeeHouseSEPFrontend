import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import the icons you need
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import Footer from '@/components/layout/Footer/Footer'
import classNames from 'classnames/bind'
import Header from '@/components/layout/Header/Header'
import styles from './Home.module.css'

const cx = classNames.bind(styles)
export default function Home() {
  return (
    <div className={cx('containerfull')}>
      <Header />
      <Carousel infiniteLoop autoPlay showArrows={false} showStatus={false}>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/Love.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/Love1.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/Love2.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/Love2.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/Love2.png" />
            </div>
          </a>
        </div>
      </Carousel>
      <Row className={cx('poster')}>
        <Col xs={12}>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/poster.png" />
            </div>
          </a>
        </Col>
        <Col xs={12}>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/poster2.png" />
            </div>
          </a>
        </Col>
      </Row>
      <div className={cx('contact')}>
        <Row>
          <Col xs={12} md={6}>
            <div className="position-relative">
              <div className={cx('info')}> QUÁN MỚI </div>
              <div
                style={{ width: '100%', height: '459px', position: 'relative', aspectRatio: '1/1' }}
              >
                <Image layout="fill" objectFit="cover" src="/asset/store.jpg" />
              </div>
              <Carousel
                infiniteLoop
                autoPlay
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                className={cx('info1')}
              >
                <div className={cx('location')}>
                  <h1 className="fs-4">HÀM CÁ MẬP</h1>
                  <h3 className="fs-6 w-75">
                    Tầng 4, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className="fs-6">
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={cx('location')}>
                  <h1 className="fs-4">HÀM CÁ SẤU</h1>
                  <h3 className="fs-6 w-75">
                    Tầng 5, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className="fs-6">
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={cx('location')}>
                  <h1 className="fs-4">HÀM CÁ VOI</h1>
                  <h3 className="fs-6 w-75">
                    Tầng 6, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className="fs-6">
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon
                      icon={faAmbulance}
                      style={{ fontSize: 15, color: 'orange', marginLeft: '10px' }}
                    />
                  </h3>
                </div>
              </Carousel>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={cx('container')}>
              <div
                style={{ width: '100%', height: '459px', position: 'relative', aspectRatio: '1/1' }}
              >
                <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
              </div>
              <div className={cx('somenews')}>
                <h1 className={cx('newsmost')}> TIN MỚI NHẤT</h1>
                <Row container className={cx('news')}>
                  <Col xs={6} md={4}>
                    <Image src="/asset/tet1.jpg" width={120} height={80} alt="Tet1" />
                  </Col>
                  <Col xs={6} md={8}>
                    <h3 className="fs-6">Đón tết này khác lạ với hightlands</h3>
                    <h5>28/12/2022</h5>
                  </Col>
                </Row>
                <Row container className={cx('news')}>
                  <Col xs={6} md={4}>
                    <Image src="/asset/tet2.jpg" width={120} height={80} alt="Tet1" />
                  </Col>
                  <Col xs={6} md={8}>
                    <h3 className="fs-6">HIGHLANDS COFFEE LÀ CỦA CHÚNG MÌNH!</h3>
                    <h5>28/12/2022</h5>
                  </Col>
                </Row>
                <Row container className={cx('news')}>
                  <Col xs={6} md={4}>
                    <Image src="/asset/tet3.jpg" width={120} height={80} alt="Tet1" />
                  </Col>
                  <Col xs={6} md={8}>
                    <h3 className="fs-6">ĐÊM TRĂNG DIỆU KỲ CÙNG HIGHLANDS COFFEE</h3>
                    <h5>28/12/2022</h5>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
