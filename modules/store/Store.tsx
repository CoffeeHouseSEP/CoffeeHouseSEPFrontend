import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { useEffect } from 'react'
import { AiTwotonePhone, AiOutlineWifi, AiFillCreditCard } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function Store() {
  const translate = useTranslationFunction()

  //   const [page, setPage] = useState<number>(1)
  const result = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    preventLoadingGlobal: true,
  })
  const { data, loading, setLetCall } = result
  const numberOfStore = data?.result.data.length
  useEffect(() => {
    setLetCall(true)
  }, [])
  return (
    <>
      {!loading && (
        <div
          style={{
            maxWidth: '1200px',
            padding: '20px 15px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '45px',
                lineHeight: '55px',
                fontWeight: 'bold',
                textAlign: 'left',
                color: '#53382c',
                textTransform: 'uppercase',
              }}
            >
              Tìm quán cà phê
            </h1>
            <div
              style={{
                height: '550px',
                background: '#fff',
                width: '268px',
                overflowX: 'auto',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '15px',
                    lineHeight: '24px',
                    padding: '10px 12px',
                    borderBottom: '1px solid #dcdcdc',
                    background: '#f2f2f2',
                    fontStyle: 'italic',
                  }}
                >
                  {' '}
                  Find {numberOfStore} <span>stores</span>
                </div>
                <div>
                  <div
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s linear',
                    }}
                  >
                    {data?.result.data.map((item) => (
                      <div style={{ marginBottom: '10px', borderBottom: 'solid 1px #e7e7e7' }}>
                        <div
                          style={{
                            fontSize: '18px',
                            lineHeight: '26px',
                            fontWeight: 'bold',
                            color: '#555555',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ marginBottom: '5px', color: '#666666' }}>{item.address}</div>
                        <div style={{ marginBottom: '5px', color: '#666666' }}>
                          <AiTwotonePhone /> {item.phoneNumber}
                        </div>
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
                            {item.status === 1 ? 'OPEN' : 'CLOSED'}
                          </span>{' '}
                          Open 7:00 – 23:00 * 7 days/week
                        </div>
                        <div>
                          {' '}
                          <AiOutlineWifi /> Wifi Free
                        </div>
                        <div style={{ marginBottom: 15 }}>
                          {' '}
                          <AiFillCreditCard /> Payment by card
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>MAP</div>
        </div>
      )}
    </>
  )
}
