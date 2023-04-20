import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { DashboardResponse } from '@/types/dashboard'
import { useSelector } from 'react-redux'

export const DashboardCard = ({ data }: { data: DashboardResponse }) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const result = [
    {
      value: data.branchName,
      unit: 'Branch name',
    },
    {
      value: data.revenue,
      unit: 'Revenue',
    },
    {
      value: data.totalOrders,
      unit: 'Total orders',
    },
  ]

  return (
    <>
      {result.map((item) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gridColumn: 'span 1 / span 1',
          }}
        >
          <div
            style={{
              padding: 10,
              width: '100%',
              aspectRatio: 1,
              backgroundColor: themeValue[darkTheme].colors.background,
              boxShadow: themeValue[darkTheme].shadows.lg,
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {item.value}
              </div>
              <div>{item.unit}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
