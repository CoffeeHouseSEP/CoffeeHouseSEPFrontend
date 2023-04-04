import Page403 from '@/components/403/Page403'
import { ROLE_COOKIE } from '@/constants/auth'
import { ReactNode } from 'react'
import { useCookies } from 'react-cookie'

export const useRoleSwitch = (children: ReactNode) => {
  const [cookies] = useCookies([ROLE_COOKIE])

  if (cookies.role === 'ADMIN') return <>{children}</>
  return <Page403 />
}
