import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '50%',
            background: 'linear-gradient(to right, #abbaab, #ffffff)',
            maxWidth: '1200px',
            padding: '0 15px',
            textAlign: 'center',
          }}
        >
          <div
            data-eff="fadeInUp"
            data-delay="0.3"
            style={{
              animationDelay: '0.3s',
              display: 'block',
              fontSize: '45px',
              lineHeight: '55px',
              fontWeight: 'normal',
              color: '#333333',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: '20px',
            }}
          >
            <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">NGUỒN GỐC</a>
          </div>
          <div
            data-eff="fadeInUp"
            data-delay="0.5"
            style={{
              animationDelay: '0.5s',
              fontSize: '15px',
              lineHeight: '23px',
              overflow: 'hidden',
              color: '#53382c',
            }}
          >
            <p>
              <div style={{ fontSize: 18 }}>CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH</div>
            </p>
            <div style={{ width: '50%', margin: '0 auto' }}>
              <div style={{ fontFamily: 'Roboto,sans-serif' }}>
                <div style={{ fontSize: 16 }}>
                  <div style={{ lineHeight: '115%' }}>
                    <div style={{ lineHeight: '115%' }}>
                      Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ tình yêu dành cho
                      đất Việt cùng với cà phê và cộng đồng nơi đây.&nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: 'Roboto,sans-serif' }}>
                <div style={{ fontSize: 16 }}>
                  Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là có thể phục vụ và góp phần
                  phát triển cộng đồng bằng cách siết chặt thêm sự kết nối và sự gắn bó giữa người
                  với người.
                </div>
              </div>
            </div>
          </div>
          <div
            data-eff="fadeInUp"
            data-delay="0.7"
            style={{
              animationDelay: '0.7s',
              display: 'inline-block',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#b22830',
              textTransform: 'uppercase',
              border: 'solid 1px #b22830',
              padding: '7px 63px',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">
              <div>Xem chi tiết</div>
            </a>
          </div>
        </div>

        <div className="img lazy-start fadeIn" style={{ width: '50%' }}>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '374px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/about1.jpg" />
            </div>
          </a>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className="img lazy-start fadeIn" style={{ width: '50%' }}>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '374px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" objectFit="cover" src="/asset/about2.jpg" />
            </div>
          </a>
        </div>
        <div
          style={{
            width: '50%',
            background: 'linear-gradient(to right, #f2994a, #f2c94c)',
            maxWidth: '1200px',
            padding: '0 15px',
            textAlign: 'center',
          }}
        >
          <div
            data-eff="fadeInUp"
            data-delay="0.3"
            style={{
              animationDelay: '0.3s',
              display: 'block',
              fontSize: '45px',
              lineHeight: '55px',
              fontWeight: 'normal',
              color: '#333333',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: '20px',
            }}
          >
            <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">DỊCH VỤ</a>
          </div>
          <div
            data-eff="fadeInUp"
            data-delay="0.5"
            style={{
              animationDelay: '0.5s',
              fontSize: '15px',
              lineHeight: '23px',
              overflow: 'hidden',
              color: '#53382c',
            }}
          >
            <p>
              <div style={{ fontSize: 18 }}>DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH</div>
            </p>
            <div style={{ width: '50%', margin: '0 auto' }}>
              <div style={{ fontFamily: 'Roboto,sans-serif' }}>
                <div style={{ fontSize: 16 }}>
                  <div style={{ lineHeight: '115%' }}>
                    <div style={{ lineHeight: '115%' }}>
                      Highlands Coffee® là không gian của chúng mình nên mọi thứ ở đây đều vì sự
                      thoải mái của chúng mình. Đừng giữ trong lòng, hãy chia sẻ với chúng mình điều
                      bạn mong muốn để cùng nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-eff="fadeInUp"
            data-delay="0.7"
            style={{
              animationDelay: '0.7s',
              display: 'inline-block',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#b22830',
              textTransform: 'uppercase',
              border: 'solid 1px #b22830',
              padding: '7px 63px',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            <a href="https://www.highlandscoffee.com.vn/vn/nguon-goc.html">
              <div>Xem chi tiết</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}