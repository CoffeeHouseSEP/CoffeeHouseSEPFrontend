import { CustomSlider } from '@/components/slider/Slider'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { CardGoods } from '@/modules/home-comps/card-goods/CardGoods'
import ImageItem from '@/modules/news/Image/ImageItem'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsRequest } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function GoodsDetail() {
  const [qty, setQty] = useState<number>(1)
  const [activeSize, setActiveSize] = useState<number>(1)
  const router = useRouter()
  const translate = useTranslationFunction()
  const pixel = useResponsive()
  const id = router?.query?.id?.toString()

  // const genderLabel = useTranslation('gender')
  const goods = useApiCall<CommonListResultType<GoodsRequest>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: { page: '1', pageSize: '1', goodsId: id || '' },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
  })

  const setQuantity = (id: number) => {
    if (id <= 1) {
      setQty(1)
    } else {
      setQty(id - 1)
    }
  }
  const { data, loading, setLetCall } = goods
  const goodDetail = data?.result?.data[0]

  const newsList = useApiCall<CommonListResultType<GoodsRequest>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '5',
          categoryId: goodDetail?.categoryId || 1,
          keySort: 'desc',
        },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
  })

  useEffect(() => {
    if (!!id) {
      setLetCall(true)
      newsList.setLetCall(true)
    }
  }, [id])
  const goodList = newsList.data?.result?.data
  return (
    <div
      style={{
        width: '100vw',
        maxWidth: '100%',
        overflow: 'hidden',
        marginBottom: '50px',
      }}
    >
      {!loading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: pixel <= 1280 ? 'column' : 'row',
          }}
        >
          <div>
            <h5
              style={{
                marginBottom: '0.5rem',
                cursor: 'pointer',
                fontSize: '34px',
                lineHeight: '44px',
                textTransform: 'uppercase',
                color: '#53382c',
                display: 'block',
              }}
              onClick={() => router.push(`/goods/${goodDetail?.goodsId}`)}
            >
              {goodDetail?.name}
            </h5>
            <div
              style={{
                aspectRatio: '1/1',
                cursor: 'pointer',
                position: 'relative',
                background: '#ffffff',
                border: 'solid 1px #eeeeee',
                transition: 'linear 1s',
              }}
              onClick={() => router.push(`/goods/${goodDetail?.goodsId}`)}
            >
              <ImageItem altname={goodDetail?.name} id={goodDetail?.goodsId} />
            </div>
          </div>
          <div style={{ marginLeft: '15px' }}>
            <p
              style={{
                marginBottom: 0,
                paddingTop: '0.5rem',
                fontSize: '14px',
                lineHeight: '24px',
                color: ' #53382c',
                fontWeight: 'normal',
              }}
            >
              {goodDetail?.description}
            </p>
            <div
              style={{
                marginTop: '10px',
                backgroundColor: '#333',
                color: '#fff',
                width: pixel <= 500 ? '100%' : '375px',
                height: pixel <= 500 ? '50px' : '93px',
                cursor: 'pointer',
                borderRadius: '5px',
                position: 'relative',
                boxShadow: '0 2px 4px 0 #b5313a, 0 2px 5px 0 #b5313a',
              }}
            >
              <div
                style={{
                  fontSize: pixel <= 500 ? '0.6rem' : '1.5rem',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                ĐẶT MUA NGAY
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f7f8fa',
                padding: '10px',
              }}
            >
              <button type="button" onClick={() => setQuantity(qty)}>
                <AiFillLeftCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
              </button>
              {/* amount */}
              <p style={{ fontSize: '2rem', margin: '10px 10px', color: '#000' }}>{qty}</p>
              {/* decrease amount */}
              <button type="button" onClick={() => setQty(qty + 1)}>
                <AiFillRightCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
              </button>
            </div>
            {/* <div style={{ margin: '10px 0' }}> Size : {goodDetail?.isSize === 0 ? 'M' : 'L'}</div>
             */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Size :</span>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'block',
                    margin: '0 10px',
                    padding: '5px 10px',
                    border: activeSize === 1 ? 'solid 1px #b22830' : 'solid 1px #c3c3c3',
                    color: activeSize === 1 ? '#b22830' : '#000',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveSize(1)}
                >
                  <span>M</span>
                </div>
                <div
                  style={{
                    display: 'block',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    border: activeSize === 2 ? 'solid 1px #b22830' : 'solid 1px #c3c3c3',
                    color: activeSize === 2 ? '#b22830' : '#000',
                  }}
                  onClick={() => setActiveSize(2)}
                >
                  <span>L</span>
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: 18, fontWeight: 700, color: '#53382c' }}>
              <span style={{ marginRight: ' 5px' }}> Price :</span>
              {activeSize === 1
                ? goodDetail?.applyPrice
                : goodDetail?.applyPrice && goodDetail.applyPrice + 9}
              ${' '}
            </h4>
          </div>
        </div>
      )}
      <hr />

      {goodList && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: pixel <= 1280 ? '100%' : '400px',
            height: '100%',
            margin: '0 auto',
          }}
        >
          <CustomSlider
            dot={false}
            ItemCard={goodList.map((item: GoodsRequest) => (
              <CardGoods key={item.goodsId} data={item} />
            ))}
            numberDisplay={1}
          />
        </div>
      )}
    </div>
  )
}
