import { FeedBackFromTravelers, HighlightData, RecommendedDataType } from './MockDataType'

type RecommendedDataTypeStore = {
  id: string
  title: string
  address: string
  name: string
}
export const highlightData: HighlightData[] = [
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/25462197/506168035/01eb644e25e1629347061522f356c631.jpg?ca=29&ce=0',
    id: '1',
    name: 'Somerset Feliz TP Hồ Chí Minh (Somerset Feliz Ho Chi Minh City)',
    price: 'VND 2,597,891',
    address: 'Quận 2, Hồ Chí Minh',
    tab: 'Hồ Chí Minh',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/18588481/-1/3fd29837e57bfead7de5da6f0586d290.jpg?ca=16&ce=1',
    id: '2',
    name: 'Căn hộ Cherry - Trung tâm Thảo Điền (Cherry apartment - Thao Dien Centre)',
    price: 'VND 916,364',
    address: 'Quận 2, Hồ Chí Minh',
    tab: 'Hồ Chí Minh',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/18588481/-1/3fd29837e57bfead7de5da6f0586d290.jpg?ca=16&ce=1',
    id: '3',
    name: '  ZO APARTMENT RIVER GATE - Free Gym and Pool',
    price: 'VND 1,843,750',
    address: 'Quận 4, Hồ Chí Minh',
    tab: 'Hồ Chí Minh',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/28529139/-1/fa4e6b959333cc7e1406f937f36cb41b.jpg?ca=27&ce=0',
    id: '4',
    name: 'Fraser Residence Hà Nội (Fraser Residence Hanoi)',
    price: 'VND 1,783,956',
    address: 'Bắc Từ Liêm, Hà Nội',
    tab: 'Hà Nội',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/7405531/-1/b03c0300090dd23125c644f1851e0143.jpg?ce=0',
    id: '5',
    name: 'Khách sạn Family Transit 2 (Family Transit 2 Hotel)',
    price: 'VND 1,783,956',
    address: 'Sân bay Nội Bài, Hà Nội',
    tab: 'Hà Nội',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/2664478/-1/c46357807c571b0922ef6d25875bc18b.jpg?ca=15&ce=1',
    id: '6',
    name: 'Biệt thự Rose Hill Đà Lạt - Hướng Núi (Dalat Rose Hill Villa - Mountain View)',
    price: 'VND 1,130,961',
    address: 'Thác Cam Ly, Đà Lạt',
    tab: 'Đà Lạt',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/620/6202073/6202073_18120415240070098226.jpg?ca=7&ce=1',
    id: '7',
    name: 'DALAT LEGEND homestay',
    price: 'VND 467,569',
    address: 'Trung tâm Đà Lạt, Đà Lạt',
    tab: 'Đà Lạt',
  },
  {
    imageUrl:
      'https://q-xx.bstatic.com/xdata/images/hotel/max500/220659630.jpg?k=452245f51c88a0c5baf6975d773a37b8222d01de71143acb56302b2cce39e5f6&o=',
    id: '8',
    name: 'Sả Đà Lạt (Dalat Sa - LemonGrass)',
    price: 'VND 337,662',
    address: 'Trung tâm Đà Lạt, Đà Lạt',
    tab: 'Đà Lạt',
  },
  {
    imageUrl:
      'https://q-xx.bstatic.com/xdata/images/hotel/max500/413440531.jpg?k=39dc877b809f1ee625089697a9b9754826ad7f1fb051a68fc8a840c730e4793a&o=',
    id: '9',
    name: '5-homestay I',
    price: 'VND 1,090,909',
    address: 'Phường 8, Vũng Tàu',
    tab: 'Vũng Tàu',
  },
  {
    imageUrl:
      'https://q-xx.bstatic.com/xdata/images/hotel/max500/387342200.jpg?k=280d304411592065fa193cfa0939d07334d53e38530d54c0b4058a1430f512e4&o=',
    id: '10',
    name: 'The Song Luxury Apartment, Can ho The Song Vung Tau & Havilla Homestay',
    price: 'VND 1,890,909',
    address: 'Thắng Tam, Vũng Tàu',
    tab: 'Vũng Tàu',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/8190193/-1/2779e1c76f0bc3b63eaf908ee6df94bc.jpg?ce=0',
    id: '11',
    name: 'K-House vs Apartment (K House vs apartment)',
    price: 'VND 1,600,000',
    address: 'Phước Mỹ, Đà Nẵng',
    tab: 'Đà Nẵng',
  },
  {
    imageUrl:
      'https://pix8.agoda.net/hotelImages/485/4858029/4858029_18041617110063435772.jpg?ca=0&ce=1',
    id: '12',
    name: 'Biệt thự Fanta Suite (Fanta Suite Villa)',
    price: 'VND 1,227,273',
    address: 'Phước Mỹ, Đà Nẵng',
    tab: 'Đà Nẵng',
  },
]
export const cityStore: RecommendedDataTypeStore[] = [
  {
    id: '1',
    title: 'HÀM CÁ MẬP',
    name: 'Tầng 3, 1-3-5 Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    address: 'Tìm đường',
  },
  {
    id: '1',
    title: 'HÀM CÁ SẤU',
    name: '721 Huỳnh Tấn Phát, Phường Phú Thuận, Quận 7, Tp. Hồ Chí Minh',
    address: 'Tìm đường',
  },
  {
    id: '1',
    title: 'HÀM CÁ TO',
    name: '721 Huỳnh Tấn Phát, Phường Phú Thuận, Quận 7, Tp. Hồ Chí Minh',
    address: 'Tìm đường',
  },
]
export const cityData: RecommendedDataType[] = [
  {
    id: '1',
    imageUrl: '/asset/slider1.jpg',
    name: 'Hồ Chí Minh',
    properties: '32',
  },
  {
    id: '2',
    imageUrl: '/asset/slider2.jpg',
    name: 'Hà Nội',
    properties: '45',
  },
  {
    id: '3',
    imageUrl: '/asset/slider3.jpeg',
    name: 'Đà Lạt',
    properties: '23',
  },
]
export const recomendData: RecommendedDataType[] = [
  {
    id: '1',
    imageUrl:
      'https://cdn6.agoda.net/images/accommodation/other-property-types/entire-apartment.jpg',
    name: 'Căn hộ',
    properties: '156.786',
  },
  {
    id: '2',
    imageUrl: 'https://cdn6.agoda.net/images/accommodation/other-property-types/entire-house.jpg',
    name: 'Nhà cho thuê',
    properties: '517.703',
  },
  {
    id: '3',
    imageUrl: 'https://cdn6.agoda.net/images/accommodation/other-property-types/entire-villa.jpg',
    name: 'Biệt thự riêng',
    properties: '181.167',
  },
  {
    id: '4',
    imageUrl:
      'https://cdn6.agoda.net/images/accommodation/other-property-types/entire-bungalow.jpg',
    name: 'Nhà trệt',
    properties: '8.801',
  },
]

export const feedBackData: FeedBackFromTravelers[] = [
  {
    id: '1',
    name: 'RaHà Nộiee đến từ Philippines',
    description:
      'Nơi đây hoàn toàn giống như hình ảnh đăng trên Agoda. Dịch vụ cực tốt, chúng tôi đã có 1 kỳ nghỉ tuyệt vời!Nơi đây hoàn toàn giống như hình ảnh đăng trên Agoda. Dịch vụ cực tốt, chúng tôi đã có 1 kỳ nghỉ tuyệt vời!',
    location: 'ở Đài Loan',
    hotel: 'Khách sạn King Plaza',
  },
  {
    id: '2',
    name: 'Bellarmine đến từ Philippines',
    description:
      'Giá phòng Executive hướng thành phố trên Agoda rất phải chăng. Đúng là một món hời!',
    location: 'ở Úc',
    hotel: 'Khách sạn Sydney Boulevard',
  },
  {
    id: '3',
    name: 'Henry đến từ Úc',
    description:
      'Tôi săn được giá đặc biệt giờ chót với Agoda. Phòng ốc rộng rãi, giường ngủ thoải mái và ấm cúng.',
    location: 'ở Philippines',
    hotel: 'Khách sạn Heritage',
  },
]

export const tabData: string[] = ['Hồ Chí Minh', 'Hà Nội', 'Đà Lạt', 'Vũng Tàu', 'Đà Nẵng']
export const countryData: RecommendedDataType[] = [
  {
    id: '1',
    imageUrl: 'https://pix6.agoda.net/geo/city/5085/1_5085_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Tokyo',
    properties: '11,150',
  },
  {
    id: '2',
    imageUrl: 'https://pix6.agoda.net/geo/city/9590/1_9590_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Osaka',
    properties: '7,922',
  },
  {
    id: '3',
    imageUrl: 'https://pix6.agoda.net/geo/city/9395/1_9395_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Băng Cốc',
    properties: '4,170',
  },
  {
    id: '4',
    imageUrl: 'https://pix6.agoda.net/geo/city/13740/1_13740_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Nagoya',
    properties: '4,942',
  },
  {
    id: '5',
    imageUrl: 'https://pix6.agoda.net/geo/city/1784/1_1784_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Kyoto',
    properties: '4,685',
  },
  {
    id: '6',
    imageUrl: 'https://pix6.agoda.net/geo/city/16527/1_16527_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Fukuoka',
    properties: '3,394',
  },
  {
    id: '7',
    imageUrl: 'https://pix6.agoda.net/geo/city/14690/1_14690_02.jpg?ca=6&ce=1&s=345x345&ar=1x1',
    name: 'Seoul',
    properties: '1,619',
  },
  {
    id: '8',
    imageUrl:
      'https://pix6.agoda.net/geo/city/106352/8ab949a441eec4976d4c55630004a089.jpg?ca=0&ce=1&s=345x345&ar=1x1',
    name: 'Narita',
    properties: '913',
  },
]
