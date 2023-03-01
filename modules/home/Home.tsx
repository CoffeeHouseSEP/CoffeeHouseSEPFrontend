import { Grid } from '@mui/material'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import the icons you need
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/navbar/NavBar'
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
            <Image
              className={styles.imposter}
              width={1540}
              height={485}
              src="/asset/Love1.png"
              alt="A"
            />
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <Image
              className={styles.imposter}
              width={1540}
              height={485}
              src="/asset/Love.png"
              alt="A"
            />
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <Image
              className={styles.imposter}
              width={1540}
              height={485}
              src="/asset/Love2.png"
              alt="A"
            />
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <Image
              className={styles.imposter}
              width={1540}
              height={485}
              src="/asset/Love2.png"
              alt="A"
            />
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <Image
              className={styles.imposter}
              width={1540}
              height={485}
              src="/asset/Love2.png"
              alt="A"
            />
          </a>
        </div>
      </Carousel>
      <div className={styles.poster}>
        <a href="https://activation.highlandscoffee.com.vn/">
          <Image
            className={styles.imposter}
            width={1520}
            height={485}
            src="/asset/poster.png"
            alt="A"
          />
        </a>
        <a href="https://activation.highlandscoffee.com.vn/">
          <Image
            className={styles.imposter}
            width={1520}
            height={485}
            src="/asset/poster2.png"
            alt="A"
          />
        </a>
      </div>
      <div className={styles.contact}>
        <Grid container spacing={1}>
          <Grid xs={12} md={6}>
            <div className={styles.relationship}>
              <div className={styles.info}> QUÁN MỚI </div>
              <Image width={770} height={485} src="/asset/store.jpg" alt="A" />
              <Carousel
                infiniteLoop
                autoPlay
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                className={styles.info1}
              >
                <div className={styles.location}>
                  <h1 className={styles.name}>HÀM CÁ MẬP</h1>
                  <h3 className={styles.address}>
                    Tầng 4, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className={styles.address}>
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={styles.location}>
                  <h1 className={styles.name}>HÀM CÁ SẤU</h1>
                  <h3 className={styles.address}>
                    Tầng 5, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className={styles.address}>
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon icon={faAmbulance} style={{ fontSize: 15, color: 'orange' }} />
                  </h3>
                </div>
                <div className={styles.location}>
                  <h1 className={styles.name}>HÀM CÁ VOI</h1>
                  <h3 className={styles.address}>
                    Tầng 6, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                  </h3>
                  <h3 className={styles.address}>
                    TÌM ĐƯỜNG{' '}
                    <FontAwesomeIcon
                      icon={faAmbulance}
                      style={{ fontSize: 15, color: 'orange', marginLeft: '10px' }}
                    />
                  </h3>
                </div>
              </Carousel>
            </div>
          </Grid>
          <Grid xs={12} md={6}>
            <div className={styles.container}>
              <Image width={770} height={485} src="/asset/News_Banner.jpg" alt="A" />
              <div className={styles.somenews}>
                <h1 className={styles.newsmost}> TIN MỚI NHẤT</h1>
                <Grid container className={styles.news}>
                  <Grid xs={6} md={4}>
                    <Image src="/asset/tet1.jpg" width={120} height={80} alt="Tet1" />
                  </Grid>
                  <Grid xs={6} md={8}>
                    <h3 className={styles.newsinfo}>Đón tết này khác lạ với hightlands</h3>
                    <h5>28/12/2022</h5>
                  </Grid>
                </Grid>
                <Grid container className={styles.news}>
                  <Grid xs={6} md={4}>
                    <Image src="/asset/tet2.jpg" width={120} height={80} alt="Tet1" />
                  </Grid>
                  <Grid xs={6} md={8}>
                    <h3 className={styles.newsinfo}>HIGHLANDS COFFEE LÀ CỦA CHÚNG MÌNH!</h3>
                    <h5>28/12/2022</h5>
                  </Grid>
                </Grid>
                <Grid container className={styles.news}>
                  <Grid xs={6} md={4}>
                    <Image src="/asset/tet3.jpg" width={120} height={80} alt="Tet1" />
                  </Grid>
                  <Grid xs={6} md={8}>
                    <h3 className={styles.newsinfo}>ĐÊM TRĂNG DIỆU KỲ CÙNG HIGHLANDS COFFEE</h3>
                    <h5>28/12/2022</h5>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
