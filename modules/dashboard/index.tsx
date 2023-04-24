import { Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useResponsive } from '@/hooks'
import { themeValue } from '@/lib'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { DashboardResponse } from '@/types/dashboard'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { DashboardCard } from './DashboardCard'

export const DashboardContainer = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState(1)

  const pixel = useResponsive()

  const getDashboard = useApiCall<CommonListResultType<DashboardResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.dashboard.getDashboard,
        token: cookies.token,
        params: {
          page: String(page),
          size: '10',
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
  })

  useEffect(() => {
    if (cookies.token) {
      getDashboard.setLetCall(true)
    }
  }, [page, cookies.token])

  return (
    <>
      <h2 style={{ color: themeValue.light.colors.redHighland }}>Coffee Chain Management</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${pixel <= 375 ? 2 : 3}, minmax(0, 1fr))`,
          gap: 10,
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        {getDashboard.data?.result.data &&
          getDashboard.data.result.data.length > 0 &&
          getDashboard.data.result.data.map((item) => {
            if (pixel > 375) return <DashboardCard data={item} />
            return (
              <>
                <DashboardCard data={item} />
                <div />
              </>
            )
          })}
        <div
          style={{
            maxWidth: 375,
            margin: 'auto',
            marginTop: '30px',
            gridColumn: pixel <= 375 ? 'span 2 / span 2' : 'span 3 / span 3',
          }}
        >
          <Pagination
            page={page}
            pageSize={10}
            total={getDashboard.data?.result.totalRows || 0}
            onChange={setPage}
          />
        </div>
      </div>
    </>
  )
}
