import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AiFillCreditCard, AiOutlineWifi } from 'react-icons/ai'
import { toast } from 'react-toastify'
import ImageItem from '../news/Image/ImageItem'

export default function StoreDetail() {
  const translate = useTranslationFunction()
  const router = useRouter()
  const id = router?.query?.id?.toString()
  const pixel = useResponsive()
  //   const [page, setPage] = useState<number>(1)
  const result = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
        params: { page: '1', pageSize: '1', branchId: id || '' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })
  const { data, loading, setLetCall } = result
  const storeDetail = data?.result?.data[0]

  useEffect(() => {
    if (!!id) {
      setLetCall(true)
      result.setLetCall(true)
    }
  }, [id])
  return (
    <>
      {!loading && (
        <div
          style={{
            maxWidth: '1200px',
            padding: '20px 15px',
            margin: '0 auto',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: pixel <= 980 ? '3rem' : '3.8rem',
                lineHeight: '55px',
                fontWeight: 'bold',
                textAlign: 'left',
                color: '#53382c',
                textTransform: 'uppercase',
              }}
            >
              {storeDetail?.name}
            </h1>
            <div
              style={{
                display: 'flex',
                flexDirection: pixel <= 980 ? 'column' : 'row',
                justifyItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  margin: pixel <= 980 ? '10px 0' : '20px 0',
                  width: pixel <= 980 ? `${pixel}px` : '806px',
                  height: pixel <= 980 ? `${pixel}px` : '537px',
                  aspectRatio: '1',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <ImageItem altname={storeDetail?.name} id={storeDetail?.branchId} />
              </div>
              <div
                style={{
                  maxHeight: '550px',
                  background: '#fff',
                  width: '268px',
                  overflowX: 'auto',
                }}
              >
                <div style={{ marginTop: '30px' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      lineHeight: '24px',
                      borderBottom: '1px solid #dcdcdc',
                      background: '#f2f2f2',
                      fontStyle: 'italic',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s linear',
                      }}
                    >
                      <div style={{ marginBottom: '10px', borderBottom: 'solid 1px #e7e7e7' }}>
                        <div
                          style={{
                            marginBottom: '5px',
                            color: '#666666',
                            display: 'flex',
                          }}
                        >
                          <div style={{ color: '#B22830', marginRight: '15px', minWidth: '60px' }}>
                            Address:
                          </div>{' '}
                          <div style={{ lineHeight: '23px', fontSize: '15px' }}>
                            {storeDetail?.address}
                          </div>
                        </div>
                        <hr />
                        <div
                          style={{
                            marginBottom: '5px',
                            color: '#666666',
                            display: 'flex',
                            padding: 5,
                          }}
                        >
                          <div style={{ color: '#B22830', marginRight: '15px', minWidth: '60px' }}>
                            Hotline:
                          </div>{' '}
                          <div>{storeDetail?.phoneNumber}</div>
                        </div>
                        <hr />
                        <div
                          style={{
                            marginBottom: '5px',
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: '#999999',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '20px',
                              color: '#ffffff',
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '45px',
                              height: '20px',
                              backgroundColor: '#b22830',
                              padding: '5px',
                            }}
                          >
                            {storeDetail?.status === 1 ? 'OPEN' : 'CLOSED'}
                          </span>{' '}
                          Open 7:00 – 23:00 * 7 days/week
                        </div>
                        <div style={{ padding: 5 }}>
                          {' '}
                          <AiOutlineWifi style={{ marginRight: '10px' }} /> <span>Wifi Free</span>
                        </div>
                        <div style={{ marginBottom: 15, padding: 5 }}>
                          {' '}
                          <AiFillCreditCard style={{ marginRight: '10px' }} />{' '}
                          <span>Payment by card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
