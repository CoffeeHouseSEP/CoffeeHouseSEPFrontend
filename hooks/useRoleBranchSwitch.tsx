import Page403 from '@/components/403/Page403'
import { ROLE_COOKIE } from '@/constants/auth'
import { authenticationSelector } from '@/redux/authentication'
import { ReactNode } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

export const useRoleBranchSwitch = (children: ReactNode) => {
  const [cookies] = useCookies([ROLE_COOKIE])

  const { isLoggedIn } = useSelector(authenticationSelector)

  if (isLoggedIn && cookies && cookies.role === 'BRANCH_MANAGER') return <>{children}</>
  return <Page403 />
}
