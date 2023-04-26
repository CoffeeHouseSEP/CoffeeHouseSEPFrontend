import { Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { ProfileRequest, ProfileRequestFailure } from '@/types'
import { useSelector } from 'react-redux'
import { inputStyles } from './Styles'

interface IProfileForm {
  profile: ProfileRequest
  onChangeProfile: Function
  errorState?: Partial<ProfileRequestFailure>
}

export const ProfileForm = ({ profile, onChangeProfile, errorState }: IProfileForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const userLoginName = useTranslation('userLoginName')
  const nameUser = useTranslation('nameUser')
  const userPhoneNumber = useTranslation('userPhoneNumber')
  const userEmail = useTranslation('userEmail')
  const userAddress = useTranslation('userAddress')

  const translate = useTranslationFunction()

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
          value={profile.fullName}
          label={nameUser}
          onChange={(event) => {
            onChangeProfile({
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
          value={profile.loginName}
          label={userLoginName}
          onChange={(event) => {
            onChangeProfile({
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
          value={profile.phoneNumber}
          label={userPhoneNumber}
          onChange={(event) => {
            onChangeProfile({
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
          value={profile.email}
          label={userEmail}
          onChange={(event) => {
            onChangeProfile({
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
          value={profile.address}
          label={userAddress}
          onChange={(event) => {
            onChangeProfile({
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
