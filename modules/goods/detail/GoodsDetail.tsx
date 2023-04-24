import { Button, Loading } from '@/components'
import { CustomSlider } from '@/components/slider/Slider'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { addToCartHandler } from '@/lib'
import { CardGoods } from '@/modules/home-comps/card-goods/CardGoods'
import ImageItem from '@/modules/news/Image/ImageItem'
import { setReloadCrt } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsResponse } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function GoodsDetail() {
  const [qty, setQty] = useState<number>(1)
  const [activeSize, setActiveSize] = useState<number>(0)
  const [loadingP, setLoadingP] = useState(false)
  const router = useRouter()
  const translate = useTranslationFunction()
  const pixel = useResponsive()
  const id = router?.query?.id?.toString()
  const [price, setPrice] = useState(0)

  // const genderLabel = useTranslation('gender')
  const goods = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '1',
          goodsId: id || '',
          keySort: 'desc',
          sortField: 'goodsId',
        },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message, data) {
      setQty(1)
      setActiveSize(0)
      setPrice(data.data[0].applyPrice)
    },
    preventLoadingGlobal: true,
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

  const newsList = useApiCall<CommonListResultType<GoodsResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '5',
          categoryId: goodDetail?.categoryId || 1,
          keySort: 'desc',
          sortField: 'goodsId',
        },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    preventLoadingGlobal: true,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!id) {
      setLetCall(true)
    }
  }, [id])

  useEffect(() => {
    if (!!goodDetail?.categoryId) {
      newsList.setLetCall(true)
    }
  }, [goodDetail])

  const getSize = () => {
    if (activeSize === 1) return 'M'
    if (activeSize === 2) return 'L'
    return 'S'
  }

  const getSizeUp = async () => {
    if (goodDetail?.applyPrice) {
      if (activeSize === 0) {
        setPrice(goodDetail.applyPrice)
        return
      }
      setLoadingP(true)
      try {
        const res = await getMethod({
          pathName: apiRoute.appParams.getAppPrams,
          params: {
            parType: 'UPSIZE_GOODS',
          },
        })
        let sizeString = 'M'
        if (activeSize === 2) sizeString = 'L'
        const thisResult = res?.data?.result.data.find((item: any) => item.name === sizeString)
        if (thisResult) setPrice(goodDetail.applyPrice * parseFloat(thisResult.code))
        else setPrice(goodDetail.applyPrice)
        return
      } catch (err: any) {
        setPrice(goodDetail.applyPrice)
        return
      } finally {
        setLoadingP(false)
      }
    }
  }

  useEffect(() => {
    if (goodDetail?.applyPrice) {
      getSizeUp()
    }
  }, [activeSize, goodDetail])

  const goodList = newsList.data?.result?.data
  return (
    <div
      style={{
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {loading && (
        <div
          style={{
            display: 'flex',
            width: '100vw',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loading size={50} />
        </div>
      )}
      {!loading && (
        <div
          style={{
            display: 'flex',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: pixel <= 960 ? 'column' : 'row',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: pixel <= 960 ? 'column' : 'row',
              gap: 20,
              minWidth: 375,
              maxWidth: 900,
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
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
              </h2>
              <div
                style={{
                  aspectRatio: '1/1',
                  width: '200px',
                  cursor: 'pointer',
                  position: 'relative',
                  background: '#ffffff',
                  transition: 'linear 1s',
                  borderRadius: 10,
                }}
                onClick={() => router.push(`/goods/${goodDetail?.goodsId}`)}
              >
                <ImageItem altname={goodDetail?.name} id={goodDetail?.goodsId} />
              </div>
            </div>
            <div
              style={{
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 30,
              }}
            >
              <p
                style={{
                  marginBottom: 0,
                  paddingTop: '0.5rem',
                  fontSize: '14px',
                  lineHeight: '24px',
                  color: ' #53382c',
                  fontWeight: 'normal',
                  width: pixel <= 960 ? '100%' : '50%',
                }}
              >
                {goodDetail?.description}
              </p>
              {/* <div style={{ margin: '10px 0' }}> Size : {goodDetail?.isSize === 0 ? 'M' : 'L'}</div>
               */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {goodDetail?.isSize === 1 && (
                  <>
                    <span>Size :</span>
                    <div style={{ display: 'flex', gap: 15, margin: '0px 10px' }}>
                      <div
                        style={{
                          display: 'block',
                          padding: '5px 10px',
                          border: activeSize === 0 ? 'solid 1px #b22830' : 'solid 1px #c3c3c3',
                          color: activeSize === 0 ? '#b22830' : '#000',
                          cursor: 'pointer',
                        }}
                        onClick={() => setActiveSize(0)}
                      >
                        <span>S</span>
                      </div>
                      <div
                        style={{
                          display: 'block',
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
                  </>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    type="button"
                    onClick={() => setQuantity(qty)}
                    color="primary"
                    styleType="light"
                  >
                    <AiFillLeftCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
                  </Button>
                  {/* amount */}
                  <p style={{ fontSize: '2rem', margin: '10px 10px', color: '#000' }}>{qty}</p>
                  {/* decrease amount */}
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    styleType="light"
                  >
                    <AiFillRightCircle style={{ fontSize: '2rem', cursor: 'pointer' }} />
                  </Button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Button
                  onClick={() => {
                    addToCartHandler(qty, getSize(), id)
                    toast.success('Thêm vào giỏ hàng thành công')
                    dispatch(setReloadCrt(true))
                  }}
                >
                  ĐẶT MUA NGAY
                </Button>
                <div
                  style={{
                    display: 'flex',
                    gap: 4,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#53382c',
                    margin: '10px 0px',
                  }}
                >
                  <span style={{ marginRight: ' 5px' }}> Price :</span>
                  <span>{loadingP ? <Loading /> : Math.round(price)}</span>
                  <span>VND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!goodList?.length && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: pixel <= 1280 ? '375px' : '600px',
            height: '100%',
            margin: '30px auto',
          }}
        >
          <CustomSlider
            dot={false}
            ItemCard={goodList.map((item: GoodsResponse) => (
              <CardGoods key={item.goodsId} data={item} />
            ))}
            numberDisplay={pixel > 1200 ? 4 : 1}
          />
        </div>
      )}
    </div>
  )
}
