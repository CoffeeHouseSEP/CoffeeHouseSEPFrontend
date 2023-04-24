import { Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { UserRequest, UserRequestFailure } from '@/types'
import { useSelector } from 'react-redux'

interface IUserForm {
  user: UserRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<UserRequestFailure>
  isFormUpdate?: boolean
}

export const UserForm = ({
  isFormUpdate,
  user,
  onchangeUserState,
  type,
  errorState,
}: IUserForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const userLoginName = useTranslation('userLoginName')
  const userFullName = useTranslation('userFullName')
  const userPhoneNumber = useTranslation('userPhoneNumber')
  const userEmail = useTranslation('userEmail')
  const userAddress = useTranslation('userAddress')

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={user.fullName}
          label={userFullName}
          onChange={(event) => {
            onchangeUserState({
              fullName: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.fullName && translate(errorState.fullName),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={user.loginName}
          label={userLoginName}
          onChange={(event) => {
            onchangeUserState({
              loginName: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.loginName && translate(errorState.loginName),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={user.phoneNumber}
          label={userPhoneNumber}
          onChange={(event) => {
            onchangeUserState({
              phoneNumber: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.phoneNumber && translate(errorState.phoneNumber),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read' || isFormUpdate}
          value={user.email}
          label={userEmail}
          onChange={(event) => {
            onchangeUserState({
              email: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.email && translate(errorState.email),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read' || isFormUpdate}
          value={user.address}
          label={userAddress}
          onChange={(event) => {
            onchangeUserState({
              address: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.address && translate(errorState.address),
          })}
        />
      </div>
    </div>
  )
}
