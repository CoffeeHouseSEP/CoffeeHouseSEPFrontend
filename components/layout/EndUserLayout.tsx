import { NavBarEndUser } from '../navbar'

interface IEndUserLayout {
  children: React.ReactNode
}

export const EndUserLayout = ({ children }: IEndUserLayout) => {
  return (
    <>
      <NavBarEndUser />
      <div style={{ marginTop: 122 }}>{children}</div>
    </>
  )
}
