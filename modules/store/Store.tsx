import { Loading, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useResponsive, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { AiFillCreditCard, AiOutlineWifi, AiTwotonePhone } from 'react-icons/ai'
import { toast } from 'react-toastify'

export default function Store() {
  const translate = useTranslationFunction()
  const router = useRouter()
  const pixel = useResponsive()
  const [page, setPage] = useState(1)

  //   const [page, setPage] = useState<number>(1)
  const result = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
        params: {
          page: String(page),
        },
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
  }, [page])

  const storeResult = useMemo(() => {
    const getCol = () => {
      if (pixel >= 1280) return 4
      if (pixel <= 375) return 1
      return 3
    }

    return (
      <div
        style={{
          padding: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s linear',
          display: 'grid',
          gridTemplateColumns: `repeat(${getCol()}, minmax(0, 1fr))`,
          gap: 20,
        }}
      >
        {data?.result.data.map((item) => (
          <div
            onClick={() => router.push(`/store/${item.branchId}`)}
            style={{
              marginBottom: '10px',
              borderBottom: 'solid 1px #e7e7e7',
              gridColumn: 'span 1 / span 1',
            }}
          >
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
    )
  }, [pixel, result])

  return (
    <div
      style={{
        minWidth: 375,
        maxWidth: 1200,
        margin: pixel >= 1200 ? 'auto' : undefined,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
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
            padding: '0px 10px',
          }}
        >
          Tìm quán cà phê
        </h1>
        {loading && (
          <div style={{ width: 'max-content', margin: 'auto', marginTop: 60 }}>
            <Loading size={70} />
          </div>
        )}
        <div
          style={{
            background: '#fff',
            minWidth: 375,
            maxWidth: 1200,
            overflowX: 'auto',
          }}
        >
          {!loading && (
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
              <div>{storeResult}</div>
              <div style={{ width: 'max-content', margin: 'auto ', marginBottom: 20 }}>
                <Pagination
                  page={page}
                  pageSize={10}
                  onChange={setPage}
                  total={data?.result.totalRows || 0}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
