import FooterEndUser from '../footer/FooterEndUser'
import { NavBarEndUser } from '../navbar'

interface IEndUserLayout {
  children: React.ReactNode
}

export const EndUserLayout = ({ children }: IEndUserLayout) => {
  return (
    <>
      <NavBarEndUser />
      <div style={{ marginTop: 122, minHeight: 'calc(100% - 122px)', overflowX: 'hidden' }}>
        {children}
      </div>
      <FooterEndUser />
    </>
  )
}
