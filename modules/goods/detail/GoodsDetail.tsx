import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import ImageItem from '@/modules/news/Image/ImageItem'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsRequest } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function GoodsDetail() {
  const router = useRouter()
  const translate = useTranslationFunction()
  // const [isHover, setIsHover] = useState<string | undefined>()
  // const handleMouseEnter = (id: string | undefined) => {
  //   setIsHover(id)
  // }
  // const handleMouseLeave = () => {
  //   setIsHover('-1')
  // }
  const id = router?.query?.id?.toString()

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
  const goodDetail = goods?.data?.result?.data[0]

  const newsList = useApiCall<CommonListResultType<GoodsRequest>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '5',
          categoryId: goodDetail?.categoryId || 1,
          keySort: 'desc',
          sortField: 'createdDate',
        },
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
  })
  useEffect(() => {
    if (!!id) {
      goods.setLetCall(true)
      newsList.setLetCall(true)
    }
  }, [id])

  return (
    <div
      style={{
        width: '100vw',
        maxWidth: '1170px',
        overflow: 'hidden',
        marginBottom: '200px',
        margin: '0 auto',
      }}
    >
      <div key={goodDetail?.goodsId} style={{ display: 'flex', alignItems: 'center' }}>
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
              width: '100%',
              height: '100%',
              paddingTop: '100%',
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
              backgroundColor: '#b5313a',
              color: '#fff',
              width: '375px',
              height: '93px',
              cursor: 'pointer',
              borderRadius: '5px',
              position: 'relative',
              boxShadow: '0 2px 4px 0 #b5313a, 0 2px 5px 0 #b5313a',
            }}
          >
            <div
              style={{
                fontSize: '1.5rem',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {' '}
              ĐẶT MUA NGAY
            </div>
          </div>
          <div style={{ margin: '20px 0' }}> Size : {goodDetail?.isSize === 0 ? 'M' : 'L'}</div>
          <h4 style={{ color: '#2c2891' }}>Giá :{goodDetail?.applyPrice}</h4>
        </div>
      </div>
      <div
        style={{
          width: '100vw',
          margin: '0 auto',
          maxWidth: '1170px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '3rem 2rem',
          justifyItems: 'center',
        }}
      >
        {newsList.data?.result.data &&
          newsList.data?.result.data.map((menuItem) => {
            return (
              <article key={menuItem.goodsId} style={{ display: 'grid', maxWidth: '25rem' }}>
                <div
                  style={{
                    width: '200px',
                    height: '100%',
                    position: 'relative',
                    aspectRatio: '1/1',
                    cursor: 'pointer',
                    transition: 'linear 1s',
                    border: '0.25rem solid #2c2891',
                    borderRadius: '5%',
                  }}
                  onClick={() => router.push(`/goods/${menuItem.goodsId}`)}
                >
                  <ImageItem altname={menuItem.name} id={menuItem.goodsId} />
                </div>
                <div>
                  <header
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '0.5px dotted #333',
                    }}
                  >
                    <h5
                      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
                      onClick={() => router.push(`/goods/${menuItem.goodsId}`)}
                    >
                      {menuItem.name}
                    </h5>
                  </header>
                </div>
                <p style={{ marginBottom: 0, paddingTop: '0.5rem' }}>{menuItem.description}</p>
              </article>
            )
          })}
      </div>
    </div>
  )
}
