import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import the icons you need
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/navbar/NavBar'
import { Col, Row } from 'react-bootstrap'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image
              className={styles.imagelogo}
              width={110}
              height={85}
              src="/asset/logo.png"
              alt=""
            />
          </div>
          <div className="headertools">
            <div className={styles.rowTools}>
              <div className={styles.searchTop}>
                <form>
                  <input className="text_search" placeholder="Search..." />
                  <button type="submit">
                    <Image src="/asset/i-search.svg" height={15} width={15} alt="" />
                  </button>
                </form>
              </div>
              <div className={styles.languageTop}>
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
      <div className={styles.poster}>
        <a href="https://activation.highlandscoffee.com.vn/">
          <div style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}>
            <Image layout="fill" objectFit="cover" src="/asset/poster.png" />
          </div>
        </a>
        <a href="https://activation.highlandscoffee.com.vn/">
          <div style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}>
            <Image layout="fill" objectFit="cover" src="/asset/poster2.png" />
          </div>
        </a>
      </div>
      <div className={styles.contact}>
        <Row>
          <Col xs={12} md={6}>
            <div className="position-relative">
              <div className={styles.info}> QUÁN MỚI </div>
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
                className={styles.info1}
              >
                <div className={styles.location}>
                  <h1 className="fs-4">HÀM CÁ MẬP</h1>
                  <h3 className="fs-6 w-75">
                    Tầng 4, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className="fs-6">
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={styles.location}>
                  <h1 className="fs-4">HÀM CÁ SẤU</h1>
                  <h3 className="fs-6 w-75">
                    Tầng 5, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className="fs-6">
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={styles.location}>
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
            <div className={styles.container}>
              <div
                style={{ width: '100%', height: '459px', position: 'relative', aspectRatio: '1/1' }}
              >
                <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
              </div>
              <div className={styles.somenews}>
                <h1 className={styles.newsmost}> TIN MỚI NHẤT</h1>
                <Row container className={styles.news}>
                  <Col xs={6} md={4}>
                    <Image src="/asset/tet1.jpg" width={120} height={80} alt="Tet1" />
                  </Col>
                  <Col xs={6} md={8}>
                    <h3 className="fs-6">Đón tết này khác lạ với hightlands</h3>
                    <h5>28/12/2022</h5>
                  </Col>
                </Row>
                <Row container className={styles.news}>
                  <Col xs={6} md={4}>
                    <Image src="/asset/tet2.jpg" width={120} height={80} alt="Tet1" />
                  </Col>
                  <Col xs={6} md={8}>
                    <h3 className="fs-6">HIGHLANDS COFFEE LÀ CỦA CHÚNG MÌNH!</h3>
                    <h5>28/12/2022</h5>
                  </Col>
                </Row>
                <Row container className={styles.news}>
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
      <div className={styles.footer}>
        <div className={styles.wrapper1}>
          <div className={styles.vntbutton}>
            <div className="button-wrap">
              <div className={styles.buttons}>
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
            <a
              href="mailto:customerservice@highlandscoffee.com.vn"
              className="text-decoration-none"
            >
              <span className="fa-envelope-o text-white">
                customerservice@highlandscoffee.com.vn
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
