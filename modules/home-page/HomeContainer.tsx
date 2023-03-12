import { cityData, cityStore } from '@/components/mock-data/MockDataConstant'
import { RecommendedDataType, RecommendedDataTypeStore } from '@/components/mock-data/MockDataType'
import { CustomSlider } from '@/components/slider/Slider'
import Image from 'next/image'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { CardDestinations } from '../home-comps/card-destinations/CardDestinations'
import { CardLocation } from '../home-comps/card-location/CardLocation'

export const HomeContainer = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          background: 'linear-gradient(to right, #232526, #414345)',
        }}
      >
        <CustomSlider
          ItemCard={cityData.map((item: RecommendedDataType) => (
            <CardDestinations key={item.id} data={item} />
          ))}
          numberDisplay={1}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: ' 0 auto',
          gap: 40,
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #232526, #414345)',
        }}
      >
        <CustomSlider
          ItemCard={cityStore.map((item: RecommendedDataTypeStore) => (
            <CardLocation key={item.id} data={item} />
          ))}
          numberDisplay={1}
        />
      </div>

      <div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/poster.png" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://activation.highlandscoffee.com.vn/">
            <div
              style={{ width: '100%', height: '485px', position: 'relative', aspectRatio: '1/1' }}
            >
              <Image layout="fill" src="/asset/poster2.png" />
            </div>
          </a>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
        }}
      >
        <div style={{ width: '100%', height: '459px', position: 'relative', aspectRatio: '1/1' }}>
          <Image layout="fill" objectFit="cover" src="/asset/store.jpg" />
        </div>
        {/* <div
          style={{
            position: 'absolute',
            fontSize: '2rem',
            fontWeight: '1000',
            top: '10%',
            left: '20%',
            color: '#fff',
          }}
        >
          {' '}
          QUÁN MỚI{' '}
        </div> */}
        <div
          style={{
            width: '100%',
            height: '459px',
            position: 'relative',
            top: 0,
            bottom: 0,
            aspectRatio: '1/1',
          }}
        >
          <Image layout="fill" objectFit="cover" src="/asset/News_Banner.jpg" />
          <div style={{ position: 'absolute', top: 60, left: 100 }}>
            <h3> TIN MỚI NHẤT</h3>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Image src="/asset/tet1.jpg" width={120} height={80} alt="Tet1" />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                <h5 style={{ textTransform: 'uppercase' }}>Đón tết này khác lạ với hightlands</h5>
                <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                  <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                  28/12/2022
                </span>
              </div>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', margin: '10px 0', cursor: 'pointer' }}
            >
              <Image src="/asset/tet2.jpg" width={120} height={80} alt="Tet1" />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                <h5 style={{ textTransform: 'uppercase' }}>HIGHLANDS COFFEE LÀ CỦA CHÚNG MÌNH!</h5>
                <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                  <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                  28/12/2022
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Image src="/asset/tet3.jpg" width={120} height={80} alt="Tet1" />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                <h5 style={{ textTransform: 'uppercase' }}>
                  ĐÊM TRĂNG DIỆU KỲ CÙNG HIGHLANDS COFFEE
                </h5>
                <span style={{ color: '#666666', fontSize: '12px', lineHeight: '21px' }}>
                  <BsFillCalendar2DateFill style={{ marginRight: '10px' }} />
                  28/12/2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
