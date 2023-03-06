import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
// import the icons you need
import classNames from 'classnames/bind'
import Image from 'next/image'

import { Col, Row } from 'react-bootstrap'

import styles from './AboutUs.module.css'

const cx = classNames.bind(styles)
export default function AboutUs() {
  return (
    <div className={cx('vnt-content')}>
      <div className={cx('about', 'bg1')}>
        <Row>
          <Col md={6}>
            <div className={cx('captionWrap')}>
              <div className={cx('wrapper')}>
                <div className="caption">
                  <div
                    className={cx('tend', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.3"
                    style={{ animationDelay: '0.3s' }}
                  >
                    <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">NGUỒN GỐC</a>
                  </div>
                  <div
                    className={cx('des', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.5"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <p>
                      <span style={{ fontSize: 18 }}>CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH</span>
                    </p>
                    <p className={cx('description')}>
                      <span style={{ fontFamily: 'Roboto,sans-serif' }}>
                        <span style={{ fontSize: 16 }}>
                          <span style={{ lineHeight: '115%' }}>
                            <span style={{ lineHeight: '115%' }}>
                              Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ tình yêu
                              dành cho đất Việt cùng với cà phê và cộng đồng nơi đây.&nbsp;
                            </span>
                          </span>
                        </span>
                      </span>
                      <span style={{ fontFamily: 'Roboto,sans-serif' }}>
                        <span style={{ fontSize: 16 }}>
                          Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là có thể phục vụ và
                          góp phần phát triển cộng đồng bằng cách siết chặt thêm sự kết nối và sự
                          gắn bó giữa người với người.
                        </span>
                      </span>
                    </p>
                  </div>
                  <div
                    className={cx('link', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.7"
                    style={{ animationDelay: '0.7s' }}
                  >
                    <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">
                      <span>Xem chi tiết</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} xs={12} className="img lazy-start fadeIn">
            <a href="https://activation.highlandscoffee.com.vn/">
              <div
                style={{ width: '100%', height: '374px', position: 'relative', aspectRatio: '1/1' }}
              >
                <Image layout="fill" objectFit="cover" src="/asset/about1.jpg" />
              </div>
            </a>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} className="img lazy-start fadeIn">
            <a href="https://activation.highlandscoffee.com.vn/">
              <div
                style={{ width: '100%', height: '374px', position: 'relative', aspectRatio: '1/1' }}
              >
                <Image layout="fill" objectFit="cover" src="/asset/about2.jpg" />
              </div>
            </a>
          </Col>
          <Col md={6}>
            <div className={cx('captionWrap2')}>
              <div className={cx('wrapper')}>
                <div className="caption">
                  <div
                    className={cx('tend', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.3"
                    style={{ animationDelay: '0.3s' }}
                  >
                    <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">DỊCH VỤ</a>
                  </div>
                  <div
                    className={cx('des', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.5"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <p>
                      <span style={{ fontSize: 18 }}>DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH</span>
                    </p>
                    <p className={cx('description')}>
                      <span style={{ fontFamily: 'Roboto,sans-serif' }}>
                        <span style={{ fontSize: 16 }}>
                          <span style={{ lineHeight: '115%' }}>
                            <span style={{ lineHeight: '115%' }}>
                              HHighlands Coffee® là không gian của chúng mình nên mọi thứ ở đây đều
                              vì sự thoải mái của chúng mình.
                            </span>
                          </span>
                        </span>
                      </span>
                      <span style={{ fontFamily: 'Roboto,sans-serif' }}>
                        <span style={{ fontSize: 16 }}>
                          Đừng giữ trong lòng, hãy chia sẻ với chúng mình điều bạn mong muốn để cùng
                          nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.
                        </span>
                      </span>
                    </p>
                  </div>
                  <div
                    className={cx('link', 'lazy-start', 'fadeInUp')}
                    data-eff="fadeInUp"
                    data-delay="0.7"
                    style={{ animationDelay: '0.7s' }}
                  >
                    <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">
                      <span>Xem chi tiết</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
